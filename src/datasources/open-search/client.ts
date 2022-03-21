import { DataSource } from "apollo-datasource";
import { ServiceContext } from "../../context";
import { users } from "../../../test/resolvers/user/test-data";
import { follows } from "../../../test/resolvers/follow/test-data";
import { restaurants } from "../../../test/resolvers/restaurant/test-data";
import { userLikedRestaurants } from "../../../test/resolvers/user-liked-restaurants/test-data";
import { isNotNullish } from "../../common";

export class OpenSearchDataSource extends DataSource<ServiceContext> {
    constructor() {
        super();
    }

    public getUsers = async (
        length: number,
        orderBy?: { value: string; direction: "ASC" | "DESC" }
    ): Promise<{ nodes: typeof users; totalCount: number }> => {
        const nodes =
            orderBy && orderBy.direction === "ASC"
                ? users
                      .filter((user) =>
                          user.edited_date
                              ? new Date(user.edited_date) >
                                new Date(orderBy.value)
                              : true
                      )
                      .slice(0, length)
                : orderBy && orderBy.direction === "DESC"
                ? users
                      .filter((user) =>
                          user.edited_date
                              ? new Date(user.edited_date) <
                                new Date(orderBy.value)
                              : true
                      )
                      .reverse()
                      .slice(0, length)
                : users
                      .sort((a, b) =>
                          a.edited_date && b.edited_date
                              ? new Date(a.edited_date) >
                                new Date(b.edited_date)
                                  ? 1
                                  : -1
                              : -1
                      )
                      .slice(0, length);
        return {
            nodes,
            totalCount: users.length,
        };
    };
    public getFollowee = async (
        followerId: string,
        length: number,
        orderBy?: { value: string; direction: "ASC" | "DESC" }
    ): Promise<{ nodes: typeof users; totalCount: number }> => {
        const startFollow = orderBy
            ? follows.find((follow) => follow.id === orderBy.value)
            : undefined;
        const nodes = startFollow
            ? follows
                  .filter(
                      (follow) =>
                          follows.indexOf(startFollow) <=
                              follows.indexOf(follow) &&
                          follow.follower_id === followerId
                  )
                  .slice(0, length)
                  .map((follow) =>
                      users.find((user) => user.id === follow.followee_id)
                  )
                  .filter(isNotNullish)
            : follows
                  .filter((follow) => follow.follower_id === followerId)
                  .slice(0, length)
                  .map((follow) =>
                      users.find((user) => user.id === follow.followee_id)
                  )
                  .filter(isNotNullish);
        return {
            nodes,
            totalCount: follows.length,
        };
    };
    public getFollower = async (
        followeeId: string,
        length: number,
        orderBy?: { value: string; direction: "ASC" | "DESC" }
    ): Promise<{ nodes: typeof users; totalCount: number }> => {
        const startFollow = orderBy
            ? follows.find((follow) => follow.id === orderBy.value)
            : undefined;
        const nodes = startFollow
            ? follows
                  .filter(
                      (follow) =>
                          follows.indexOf(startFollow) <=
                              follows.indexOf(follow) &&
                          follow.followee_id === followeeId
                  )
                  .map((follow) =>
                      users.find((user) => user.id === follow.follower_id)
                  )
                  .filter(isNotNullish)
                  .slice(0, length)
            : follows
                  .filter((follow) => follow.followee_id === followeeId)
                  .map((follow) =>
                      users.find((user) => user.id === follow.follower_id)
                  )
                  .filter(isNotNullish)
                  .slice(0, length);
        return {
            nodes,
            totalCount: follows.length,
        };
    };

    public getUserLikedRestaurants = async (
        userId: string,
        length: number,
        orderBy?: { value: string; direction: "ASC" | "DESC" }
    ): Promise<{ nodes: typeof restaurants; totalCount: number }> => {
        const userLikedRestaurant = userLikedRestaurants.find(
            (userLikedRestaurant) => userLikedRestaurant.user_id === userId
        );
        const nodes =
            orderBy && orderBy.direction === "ASC" && userLikedRestaurant
                ? userLikedRestaurants
                      .filter(
                          (userLikedRestaurant) =>
                              userLikedRestaurant.user_id === userId
                      )
                      .map((userLikedRestaurant) =>
                          restaurants.find(
                              (restaurant) =>
                                  restaurant.id ===
                                  userLikedRestaurant.restaurant_id
                          )
                      )
                      .filter(isNotNullish)
                      .slice(
                          userLikedRestaurants.indexOf(userLikedRestaurant),
                          userLikedRestaurants.indexOf(userLikedRestaurant) +
                              length
                      )
                : orderBy && orderBy.direction === "DESC" && userLikedRestaurant
                ? userLikedRestaurants
                      .filter(
                          (userLikedRestaurant) =>
                              userLikedRestaurant.user_id === userId
                      )
                      .map((userLikedRestaurant) =>
                          restaurants.find(
                              (restaurant) =>
                                  restaurant.id ===
                                  userLikedRestaurant.restaurant_id
                          )
                      )
                      .filter(isNotNullish)
                      .reverse()
                      .slice(
                          userLikedRestaurants.indexOf(userLikedRestaurant),
                          userLikedRestaurants.indexOf(userLikedRestaurant) +
                              length
                      )
                : userLikedRestaurants
                      .filter(
                          (userLikedRestaurant) =>
                              userLikedRestaurant.user_id === userId
                      )
                      .map((userLikedRestaurant) =>
                          restaurants.find(
                              (restaurant) =>
                                  restaurant.id ===
                                  userLikedRestaurant.restaurant_id
                          )
                      )
                      .filter(isNotNullish)
                      .slice(0, length);
        return {
            nodes,
            totalCount: users.length,
        };
    };
    public getPersonById = async (
        id: string
    ): Promise<typeof users[number] | undefined> =>
        users.find((user) => user.id === id);
}
