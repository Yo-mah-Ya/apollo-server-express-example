import { restaurants } from "../../../test/resolvers/restaurant/test-data";
import { users } from "../../../test/resolvers/user/test-data";
import { User, Restaurant } from "../types";

export const transformToUserFrom = (user: typeof users[number]): User => ({
    ...user,
    birthDate: user.birth_date,
    createdDate: user.created_date,
    editedDate: user.edited_date,
});

export const transformToRestaurantFrom = (
    restaurant: typeof restaurants[number]
): Restaurant => ({
    ...restaurant,
});
