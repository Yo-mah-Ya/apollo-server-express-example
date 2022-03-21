import DataLoader from "dataloader";
import { DataSource } from "apollo-datasource";
import { ServiceContext } from "../../context";
import { fulfilledOnly } from "../../common";
import { User } from "./types";
import { users } from "../../../test/resolvers/user/test-data";

const dataLoaderOptions = <V>(
    contentType: string
): DataLoader.Options<string, V, string> => ({
    // batch: false,
    batch: true,
    cacheKeyFn: (key: string) => `${contentType}-${key}`,
});

export class DynamoDbDataSource extends DataSource<ServiceContext> {
    constructor() {
        super();
    }

    private userLoader = new DataLoader(
        async (userIds: readonly string[]): Promise<User[]> =>
            await fulfilledOnly(
                userIds.map(async (userId) =>
                    users.find((user) => user.id === userId)
                )
            ),
        dataLoaderOptions("user")
    );

    public getUserById = (userId: string): Promise<User> =>
        this.userLoader.load(userId);
}
