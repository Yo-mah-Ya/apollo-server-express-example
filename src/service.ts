import express, { Express, Request, Response } from "express";
import compression from "compression";
import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { typeDefs, resolvers } from "./resolvers";
import { graphqlErrors, graphqlRequestTime } from "./graphql-plugins";
import { Logger } from "./common";
import * as Util from "./common/utils";
// import { DynamoDbDataSource } from "./datasources/dynamodb/client";
import { OpenSearchDataSource } from "./datasources/open-search/client";
import { ServiceContext } from "./context";
// import { initializeClient } from "./common/dynamodb";

const getExpressApp = (): Express => {
    const app = express();
    app.use(compression());
    // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-723686116
    app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV === "production" ? undefined : false,
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.get("/health", (_: Request, res: Response): void => {
        res.send("ok");
    });

    return app;
};

const createServiceContext = (): ServiceContext => ({
    dataSources: {
        // dynamodb: new DynamoDbDataSource(
        //     initializeClient({ region: process.env.DYNAMODB_REGION })
        // ),
        openSearch: new OpenSearchDataSource(),
    },
});

const initializeApolloServer = (
    serviceContext: ServiceContext
): ApolloServer => {
    const invalidFormatError = new Error("Invalid format error");
    return new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        dataSources: () => serviceContext.dataSources,
        formatError: (error) => {
            Logger.warn({
                message: Util.errorMessageOf(error),
                callSite: {
                    function: "formatError in ApolloServer",
                },
            });
            // Don't return the original error to the client, just only Error object with below message
            return invalidFormatError;
        },
        formatResponse: (response) => response,
        context: {},
        validationRules: [depthLimit(10)],
        plugins: [graphqlErrors, graphqlRequestTime],
    });
};

export const startService = async (): Promise<void> => {
    const app = getExpressApp();
    const apolloServer = initializeApolloServer(createServiceContext());
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: "/graphql",
        cors: {
            origin: "*",
            credentials: true,
        },
        bodyParserConfig: { limit: "50mb" },
    });

    const port = Util.toNumber(process.env.EXPRESS_PORT) ?? 3000;
    const server = app.listen(port, () => {
        Logger.info({
            message: `🚀 Express Server Start. Running on port ${port}. graphqlPath: ${apolloServer.graphqlPath}`,
        });
    });
    server.keepAliveTimeout = 0;
};
