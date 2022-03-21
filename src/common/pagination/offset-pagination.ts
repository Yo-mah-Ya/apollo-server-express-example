import { OffsetPageInfo } from "../../resolvers/types";

export type OffsetPagination = {
    limit: number;
    offset: number;
};
export const pageInfo = (
    foundCount: number,
    paramPagination: OffsetPagination
): OffsetPageInfo => {
    if (foundCount === 0) {
        return {
            hasNextPage: false,
            endOffset: undefined,
        };
    }
    return {
        hasNextPage: paramPagination.limit <= foundCount,
        endOffset: paramPagination.offset + foundCount - 1,
    };
};

export const normalizeOffsetPagination = (
    paramPagination: Partial<OffsetPagination>
): OffsetPagination => ({
    limit: paramPagination.limit ? Math.min(paramPagination.limit, 500) : 500,
    offset: paramPagination.offset ? Math.min(paramPagination.offset, 500) : 0,
});
