// import { DynamoDbDataSource } from "./datasources/dynamodb/client";
import { OpenSearchDataSource } from "./datasources/open-search/client";

export type ServiceContext = {
    dataSources: DataSources;
};
export type DataSources = {
    openSearch: OpenSearchDataSource;
    // dynamodb: DynamoDbDataSource;
};
