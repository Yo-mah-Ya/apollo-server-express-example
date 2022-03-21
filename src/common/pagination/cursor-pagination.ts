import { CursorPageInfo, Node } from "../../resolvers/types";
import * as t from "io-ts";

/**
 * first time to get items.
 */
const firstTimeParam = t.intersection([
    t.type({ first: t.number }),
    t.partial({ after: t.undefined, last: t.undefined, before: t.undefined }),
]);
type FirstTimeParam = t.TypeOf<typeof firstTimeParam>;
const isFirstTimeParam = (
    clientParam: unknown
): clientParam is FirstTimeParam => firstTimeParam.is(clientParam);
type FirstTimeQuery = Pick<FirstTimeParam, "first">;

/**
 * set the "after" argument. searching the next page
 */
const searchingForwardParam = t.intersection([
    t.type({ first: t.number, after: t.string }),
    t.partial({ last: t.undefined, before: t.undefined }),
]);
type ForwardParam = t.TypeOf<typeof searchingForwardParam>;
const isForwardParam = (clientParam: unknown): clientParam is ForwardParam =>
    searchingForwardParam.is(clientParam);

type ForwardQuery = Pick<ForwardParam, "first"> & {
    after: string;
};

/**
 * set the "before" argument. searching the previous page
 */
const searchingBackwardParam = t.intersection([
    t.partial({ first: t.undefined, after: t.undefined }),
    t.type({ last: t.number, before: t.string }),
]);
type BackwardParam = t.TypeOf<typeof searchingBackwardParam>;
const isBackwardParam = (clientParam: unknown): clientParam is BackwardParam =>
    searchingBackwardParam.is(clientParam);
type BackwardQuery = Pick<BackwardParam, "last"> & {
    before: string;
};

type Edge<T extends Node> = {
    cursor: string;
    node: T;
};
type CursorOperation<T extends Node> = {
    decodeCursor: (cursorValue: string) => string;
    toEdge: (node: T) => Edge<T>;
};
const cursorOperationWith = <T extends Node>(
    nodeName: string
): CursorOperation<T> => {
    // cursor_prefix:cursor_value
    const cursorKeyWithSeparator = `${nodeName}:`;
    const cursorKeyRegExp = new RegExp(`^${cursorKeyWithSeparator}`);

    const encodeCursor = (cursorValue: string): string =>
        Buffer.from(`${cursorKeyWithSeparator}${cursorValue}`).toString(
            "base64"
        );

    return {
        decodeCursor: (cursor: string): string =>
            Buffer.from(cursor, "base64")
                .toString()
                .replace(cursorKeyRegExp, ""),
        toEdge: (node: T): Edge<T> => ({
            cursor: encodeCursor(node.id),
            node,
        }),
    };
};

type QueryResponse<T extends Node> = { nodes: T[]; totalCount: number };
type Queries<T extends Node, P> = {
    firstTimeQuery: (query: P & FirstTimeQuery) => Promise<QueryResponse<T>>;
    forwardQuery: (query: P & ForwardQuery) => Promise<QueryResponse<T>>;
    backwardQuery?: (query: P & BackwardQuery) => Promise<QueryResponse<T>>;
};
export const query = async <T extends Node, P>(
    clientParam: P,
    nodeName: string,
    { firstTimeQuery, forwardQuery, backwardQuery }: Queries<T, P>
): Promise<
    {
        edges: Edge<T>[];
        pageInfo: CursorPageInfo;
    } & QueryResponse<T>
> => {
    if (!nodeName) throw new Error(`nodeName should not be empty`);

    const paramErrorMessageFrom = (func: keyof Queries<T, P>): string =>
        `The clientParam passed, but the ${func} function is not passed`;

    const { toEdge, decodeCursor } = cursorOperationWith<T>(nodeName);
    const responseCursor = (
        edges: Edge<T>[]
    ): Pick<CursorPageInfo, "startCursor" | "endCursor"> => ({
        startCursor: edges[0]?.cursor,
        endCursor: edges.slice(-1)[0]?.cursor,
    });

    if (isFirstTimeParam(clientParam)) {
        const { nodes, totalCount } = await firstTimeQuery({
            ...clientParam,
            first: clientParam.first,
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: false,
                hasNextPage: clientParam.first <= nodes.length,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else if (isForwardParam(clientParam)) {
        const { nodes, totalCount } = await forwardQuery({
            ...clientParam,
            first: clientParam.first,
            after: decodeCursor(clientParam.after),
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: true,
                hasNextPage: clientParam.first <= nodes.length,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else if (isBackwardParam(clientParam)) {
        if (!backwardQuery)
            throw new Error(paramErrorMessageFrom("forwardQuery"));
        const { nodes, totalCount } = await backwardQuery({
            ...clientParam,
            last: clientParam.last,
            before: decodeCursor(clientParam.before),
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: clientParam.last <= nodes.length,
                hasNextPage: true,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else {
        throw new Error(
            `Invalid clientParam for cursor pagination ${JSON.stringify(
                clientParam
            )}`
        );
    }
};
