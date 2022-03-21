import { isObject } from "./object";

export type CallSite = {
    file?: string;
    function?: string;
    line?: string;
};
type LogMessage = {
    message: string;
    callSite?: CallSite;
};

enum LogLevel {
    Trace = "TRACE",
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR",
    Critical = "CRITICAL",
}

const parseObjectToString = <V>(message: Record<string, V>): string => {
    const body = Object.entries(message)
        .map((entry) => `${entry[0]}: ${stringEscape(entry[1])}`)
        .join(", ");
    return `{ ${body} }`;
};

const stringEscape = (message: unknown): string =>
    typeof message === "string"
        ? `"${message}"`
        : isObject(message)
        ? parseObjectToString(message)
        : Array.isArray(message)
        ? `[${message.join(", ")}]`
        : String(message);

const messageWith =
    (paramLogLevel: LogLevel) =>
    <T extends LogMessage>(message: T): void => {
        console.log(
            `[${paramLogLevel}] ${new Date().toISOString()} ${parseObjectToString(
                message
            )}`
        );
    };

export const trace = messageWith(LogLevel.Trace);
export const debug = messageWith(LogLevel.Debug);
export const info = messageWith(LogLevel.Info);
export const warn = messageWith(LogLevel.Warn);
export const error = messageWith(LogLevel.Error);
export const critical = messageWith(LogLevel.Critical);
