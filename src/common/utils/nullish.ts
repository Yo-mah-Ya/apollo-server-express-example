import { warn, CallSite } from "./logger";

export const isNotNullish = <T>(value: T): value is NonNullable<T> =>
    value != undefined;

export const assertNotNullish = <T, C extends CallSite>(
    value: T,
    callSite?: C
): NonNullable<T> => {
    if (isNotNullish(value)) return value;
    warn({ message: "value is nullish", callSite });
    throw new Error("value is nullish");
};
