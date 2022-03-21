import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query {
        allUsers(
            after: String
            first: Int
            before: String
            last: Int
        ): UsersConnection
        user(id: ID!): User
    }

    type UsersConnection {
        pageInfo: CursorPageInfo!
        edges: [UsersEdge]
        totalCount: Int
        nodes: [User]
    }

    type UsersEdge {
        node: User
        cursor: String!
    }

    enum Gender {
        MEN
        WOMEN
        OTHER
    }

    """
    An individual user or character within the Star Wars universe.
    """
    type User implements Node {
        """
        The ID of an object
        """
        id: ID!
        name: String!
        address: String

        """
        The ISO 8601 date format of the time that this user was born
        """
        birthDate: String
        gender: Gender
        userLikedRestaurantsConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): UserRestaurantsConnection

        followeeConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): UsersConnection
        followerConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): UsersConnection

        """
        The ISO 8601 date format of the time that this resource was created.
        """
        createdDate: String

        """
        The ISO 8601 date format of the time that this resource was edited.
        """
        editedDate: String
    }

    type UserRestaurantsConnection {
        pageInfo: CursorPageInfo!
        edges: [UserRestaurantsEdge]
        totalCount: Int
        nodes: [Restaurant]
    }

    type UserRestaurantsEdge {
        node: Restaurant
        cursor: String!
    }
`;
