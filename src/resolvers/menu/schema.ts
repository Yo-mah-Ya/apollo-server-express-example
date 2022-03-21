import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query {
        allMenus(
            after: String
            first: Int
            before: String
            last: Int
        ): MenusConnection
        menu(id: ID!): Menu
    }

    enum MenuCategory {
        # american
        BRAZIL
        ARGENTINA
        MEXICAN
        AMERICAN
        # european
        FRENCH
        ITALIAN
        SPANISH
        PORTUGAL
        UK
        RUSSIA
        # east asia
        ARABIAN
        # india
        INDIAN
        # east asia
        CHINESE
        JAPANESE
        KOREAN
        # south east asia
        THAI
        INDONESIAN

        OTHERS
    }
    """
    A single menu.
    """
    type Menu implements Node {
        id: ID!
        title: String!
        categories: [MenuCategory!]!
        restaurantConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): MenuRestaurantsConnection

        """
        The ISO 8601 date format of the time that this resource was created.
        """
        createdDate: String

        """
        The ISO 8601 date format of the time that this resource was edited.
        """
        editedDate: String
    }

    type MenuRestaurantsConnection {
        pageInfo: CursorPageInfo!
        edges: [MenuRestaurantsEdge]
        totalCount: Int
        nodes: [Restaurant]
    }

    type MenuRestaurantsEdge {
        node: Restaurant
        cursor: String!
    }

    type MenusConnection {
        pageInfo: CursorPageInfo!
        edges: [MenusEdge]
        totalCount: Int
        nodes: [Menu]
    }

    type MenusEdge {
        node: Menu
        cursor: String!
    }
`;
