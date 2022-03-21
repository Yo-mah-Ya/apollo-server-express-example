import { typeDefs as commonTypeDefs } from "./common";
import { typeDefs as menuTypeDefs, resolvers as menuResolvers } from "./menu";
import { typeDefs as userTypeDefs, resolvers as userResolvers } from "./user";
import {
    typeDefs as restaurantTypeDefs,
    resolvers as restaurantResolvers,
} from "./restaurant";

export const typeDefs = [
    commonTypeDefs,
    menuTypeDefs,
    userTypeDefs,
    restaurantTypeDefs,
];
export const resolvers = [menuResolvers, userResolvers, restaurantResolvers];
