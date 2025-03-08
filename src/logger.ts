export interface ILogger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}