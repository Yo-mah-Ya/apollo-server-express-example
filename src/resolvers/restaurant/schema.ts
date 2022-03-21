import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query {
        allRestaurants(
            after: String
            first: Int
            before: String
            last: Int
        ): RestaurantsConnection
        restaurant(id: ID!): Restaurant
    }

    """
    Restaurant
    """
    type Restaurant implements Node {
        id: ID!
        name: String!
        address: String!
        scores: Float
        userLikedConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): RestaurantUsersConnection
        menuConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): RestaurantMenusConnection

        """
        The ISO 8601 date format of the time that this resource was created.
        """
        createdDate: String

        """
        The ISO 8601 date format of the time that this resource was edited.
        """
        editedDate: String
    }

    type RestaurantMenusConnection {
        pageInfo: CursorPageInfo!
        edges: [RestaurantMenusEdge]
        totalCount: Int
        nodes: [Menu]
    }

    type RestaurantMenusEdge {
        node: Menu
        cursor: String!
    }

    type RestaurantUsersConnection {
        pageInfo: CursorPageInfo!
        edges: [RestaurantUsersEdge]
        totalCount: Int
        nodes: [User]
    }

    type RestaurantUsersEdge {
        node: User
        cursor: String!
    }

    type RestaurantsConnection {
        pageInfo: CursorPageInfo!
        edges: [RestaurantsEdge]
        totalCount: Int
        nodes: [Restaurant]
    }

    type RestaurantsEdge {
        node: Restaurant
        cursor: String!
    }
`;
