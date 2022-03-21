import { PluginDefinition } from "apollo-server-core";
import { TracingFormat } from "apollo-tracing";
import { Logger } from "../common";

export const graphqlRequestTime: PluginDefinition = {
    requestDidStart: async () => ({
        willSendResponse: async (requestContext) => {
            if (!requestContext.response.extensions?.tracing) return;
            const tracing = requestContext.response.extensions
                .tracing as TracingFormat;
            const field = tracing.execution.resolvers[0]?.fieldName;
            const duration = tracing.execution.resolvers[0]?.duration;
            if (field && duration) {
                Logger.info({
                    message: `field: ${field}, duration: ${duration / 1000000}`,
                });
            }
            Logger.debug({
                message: `willSendResponse: ${
                    requestContext.request.query ?? "unknown query"
                }`,
            });
        },
    }),
};

export const graphqlErrors: PluginDefinition = {
    requestDidStart: async () => ({
        didEncounterErrors: async (requestContext) => {
            requestContext.errors.forEach((error) => {
                Logger.warn({
                    message: error.message,
                    callSite: {
                        function: "didEncounterErrors",
                    },
                });
            });
        },
    }),
};
