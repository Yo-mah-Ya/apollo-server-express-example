import { errorMessageOf } from "./error";
import * as Logger from "./logger";
import { isNotNullish } from "./nullish";

export const fulfilledOnly = async <T>(
    promises: Array<Promise<T | undefined>>
): Promise<T[]> =>
    (await Promise.allSettled(promises))
        .map((result) =>
            result.status === "fulfilled" ? result.value : undefined
        )
        .filter(isNotNullish);

export const sleep = (milliseconds: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });

export const promiseRetry = async <T = undefined>(
    func: () => Promise<T>,
    options: { retries: number; delay?: number }
): Promise<T> => {
    // Do not retry more than 10 times in any cases
    options.retries = options.retries > 10 ? 10 : options.retries;
    while (0 <= options.retries) {
        try {
            return await func();
        } catch (error) {
            options.retries--;
            if (0 <= options.retries) {
                Logger.warn({
                    message: errorMessageOf(error),
                    callSite: {
                        file: __filename,
                        function: promiseRetry.name,
                    },
                });
                await sleep(options.delay ?? 1000);
                continue;
            }
            throw error;
        }
    }
    throw new Error(`Failed to Promise Retry`);
};
