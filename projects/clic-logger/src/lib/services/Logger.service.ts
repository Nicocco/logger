import { Injectable } from "@angular/core";
import { LogPublisher } from "../class-base/log-publisher.base";
import { LogLevel } from "../enum/logger.enum";
import { LogConsole } from "../models/log-console.model";
import { LogEntry } from "../models/log-entry.model";
import { LogLocalStorage } from "../models/log-local-storage.model";

@Injectable({ providedIn: 'root' })
export class LoggerService {
    //#region
    //=========================================================================
    //                                ATTRIBUTS
    //=========================================================================

    private _logPublishers: Array<LogPublisher> = [
        new LogConsole() as unknown as LogPublisher
    ];
    private _logLevel: LogLevel = LogLevel.ALL;
    private _logWithDate: boolean = true;

    //#endregion

    //#region
    //=========================================================================
    //                                METHODES
    //=========================================================================

    constructor() { }

    //#region -------------------- PUBLIC LOGGING METHODES --------------------


    public set logLevel(newValue: LogLevel) {
        if (newValue !== undefined && newValue !== null && this._logLevel !== newValue) {
            this._logLevel = newValue;
            console.log("LOG LEVEL SET TO " + LogLevel[newValue]);
        }
    }

    //#endregion

    //#region -------------------- PUBLIC LOGGING METHODES --------------------

    public debug(msg: string, ...optionalParams: any[]): void {
        this._writeToLog(msg, LogLevel.DEBUG, optionalParams);
    }

    public info(msg: string, ...optionalParams: any[]): void {
        this._writeToLog(msg, LogLevel.INFO, optionalParams);
    }

    public warn(msg: string, ...optionalParams: any[]): void {
        this._writeToLog(msg, LogLevel.WARN, optionalParams);
    }

    public error(msg: string, ...optionalParams: any[]): void {
        this._writeToLog(msg, LogLevel.ERROR, optionalParams);
    }

    public fatal(msg: string, ...optionalParams: any[]) {
        this._writeToLog(msg, LogLevel.FATAL, optionalParams);
    }

    public log(msg: string, ...optionalParams: any[]) {
        this._writeToLog(msg, LogLevel.ALL, optionalParams);
    }

    public clear(): void {
        for (let logger of this._logPublishers) {
            logger.clear();
        }
    }

    //#endregion

    //#region -------------------------- OTHER METHODES -------------------------

    public addLoggerPublisher(...loggerPublisher: Array<LogPublisher>): Array<LogPublisher> {
        this._logPublishers.push(...loggerPublisher);
        return this._logPublishers;
    }

    public setLogLevel(newValue: LogLevel): void {
        if (newValue !== undefined && newValue !== null && this._logLevel !== newValue) {
            this._logLevel = newValue;
            console.log("LOG LEVEL SET TO " + LogLevel[newValue]);
        }
    }

    public enableDefaultLocalStorageLogs(): void {
        this._logPublishers.push(new LogLocalStorage());
    }

    public disableDefaultLocalStorageLogs(): void {
        const localStorageLogger: LogPublisher | undefined
            = this._logPublishers.find(publisher => typeof publisher === LogLocalStorage.name);
        if (localStorageLogger !== undefined) {
            this._logPublishers.splice(this._logPublishers.indexOf(localStorageLogger), 1);
        }
    }

    private _shouldLog(level: LogLevel): boolean {
        return (level >= this._logLevel && level !== LogLevel.OFF)
            || this._logLevel === LogLevel.ALL;
    }

    private _writeToLog(msg: string, level: LogLevel, params: any[]): void {
        if (this._shouldLog(level)) {
            let entry: LogEntry = new LogEntry(
                msg,
                level,
                this._logWithDate,
                params
            );

            for (let logger of this._logPublishers) {
                logger.log(entry);
            }
        }
    }

    //#endregion

    //#endregion
}
