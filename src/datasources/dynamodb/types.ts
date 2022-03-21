import { Gender } from "../../resolvers/types";
export type User = {
    id: string;
    address?: string;
    name: string;
    gender?: Gender.WOMEN | Gender.MEN | Gender.OTHER;
    birth_date?: string;
    created_date: string;
    edited_date: string;
};
