import {
    Resolvers,
    Restaurant,
    User,
    UsersConnection,
    UserFolloweeConnectionArgs,
    UserFollowerConnectionArgs,
    UserRestaurantsConnection,
    UserUserLikedRestaurantsConnectionArgs,
    QueryAllUsersArgs,
} from "../types";
import { transformToUserFrom, transformToRestaurantFrom } from "./transform";
import { ServiceContext } from "../../context";
import { CursorPagination } from "../../common/pagination";
import { assertNotNullish } from "../../common";

const MAX_LENGTH = 500;

const userConnection = async (
    parentUserId: string,
    args: UserFolloweeConnectionArgs | UserFollowerConnectionArgs,
    dataSources: ServiceContext["dataSources"],
    queryType: "followeeConnection" | "followerConnection"
): Promise<UsersConnection> =>
    await CursorPagination.query<
        User,
        UserFolloweeConnectionArgs | UserFollowerConnectionArgs
    >(args, "usersConnection", {
        firstTimeQuery: async ({ first }) => {
            const { nodes, totalCount } =
                queryType === "followeeConnection"
                    ? await dataSources.openSearch.getFollowee(
                          parentUserId,
                          Math.min(first, MAX_LENGTH)
                      )
                    : await dataSources.openSearch.getFollower(
                          parentUserId,
                          Math.min(first, MAX_LENGTH)
                      );
            return {
                nodes: nodes.map(transformToUserFrom),
                totalCount,
            };
        },
        forwardQuery: async ({ after, first }) => {
            const { nodes, totalCount } =
                queryType === "followeeConnection"
                    ? await dataSources.openSearch.getFollowee(
                          parentUserId,
                          Math.min(first, MAX_LENGTH),
                          { value: after, direction: "ASC" }
                      )
                    : await dataSources.openSearch.getFollower(
                          parentUserId,
                          Math.min(first, MAX_LENGTH),
                          { value: after, direction: "ASC" }
                      );
            return {
                nodes: nodes.map(transformToUserFrom),
                totalCount,
            };
        },
    });
export const resolvers: Resolvers = {
    Query: {
        allUsers: async (_, args, { dataSources }: ServiceContext) =>
            await CursorPagination.query<User, QueryAllUsersArgs>(
                args,
                "users",
                {
                    firstTimeQuery: async ({ first }) => {
                        const { nodes, totalCount } =
                            await dataSources.openSearch.getUsers(
                                Math.min(first, MAX_LENGTH)
                            );
                        return {
                            nodes: nodes.map(transformToUserFrom),
                            totalCount,
                        };
                    },
                    forwardQuery: async ({ after, first }) => {
                        const user = await dataSources.openSearch.getPersonById(
                            after
                        );
                        const { nodes, totalCount } =
                            await dataSources.openSearch.getUsers(
                                Math.min(first, MAX_LENGTH),
                                user
                                    ? {
                                          value: user.edited_date,
                                          direction: "ASC",
                                      }
                                    : undefined
                            );
                        return {
                            nodes: nodes.map(transformToUserFrom),
                            totalCount,
                        };
                    },
                    backwardQuery: async ({ before, last }) => {
                        const user = await dataSources.openSearch.getPersonById(
                            before
                        );
                        const { nodes, totalCount } =
                            await dataSources.openSearch.getUsers(
                                Math.min(last, MAX_LENGTH),
                                user
                                    ? {
                                          value: user.edited_date,
                                          direction: "DESC",
                                      }
                                    : undefined
                            );
                        return {
                            nodes: nodes.map(transformToUserFrom),
                            totalCount,
                        };
                    },
                }
            ),
        user: async (_, { id }, { dataSources }: ServiceContext) =>
            transformToUserFrom(
                assertNotNullish(
                    await dataSources.openSearch.getPersonById(id),
                    {
                        file: __filename,
                        function: "user query resolver",
                    }
                )
            ),
    },
    User: {
        followeeConnection: (
            { id: parentUserId },
            args,
            { dataSources }: ServiceContext
        ) =>
            userConnection(
                parentUserId,
                args,
                dataSources,
                "followeeConnection"
            ),
        followerConnection: (
            { id: parentUserId },
            args,
            { dataSources }: ServiceContext
        ) =>
            userConnection(
                parentUserId,
                args,
                dataSources,
                "followerConnection"
            ),
        userLikedRestaurantsConnection: async (
            { id: userId },
            args,
            { dataSources }: ServiceContext
        ): Promise<UserRestaurantsConnection> =>
            await CursorPagination.query<
                Restaurant,
                UserUserLikedRestaurantsConnectionArgs
            >(args, "userLikedRestaurantsConnection", {
                firstTimeQuery: async ({ first }) => {
                    const { nodes, totalCount } =
                        await dataSources.openSearch.getUserLikedRestaurants(
                            userId,
                            first
                        );
                    return {
                        nodes: nodes.map(transformToRestaurantFrom),
                        totalCount,
                    };
                },
                forwardQuery: async ({ after, first }) => {
                    const { nodes, totalCount } =
                        await dataSources.openSearch.getUserLikedRestaurants(
                            userId,
                            first,
                            { value: after, direction: "ASC" }
                        );
                    return {
                        nodes: nodes.map(transformToRestaurantFrom),
                        totalCount,
                    };
                },
                backwardQuery: async ({ before, last }) => {
                    const { nodes, totalCount } =
                        await dataSources.openSearch.getUserLikedRestaurants(
                            userId,
                            last,
                            { value: before, direction: "DESC" }
                        );
                    return {
                        nodes: nodes.map(transformToRestaurantFrom),
                        totalCount,
                    };
                },
            }),
    },
};
