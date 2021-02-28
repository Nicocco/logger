import { Injectable } from "@angular/core";
import { LogPublisher } from "../class-base/log-publisher.base";
import { LogLevel } from "../enum/logger.enum";
import { LogEntry } from "../models/log-entry.model";
import { LogPublishersService } from "./logger-publisher.service";

@Injectable({ providedIn: 'root' })
export class LoggerService {
    //#region
    //=========================================================================
    //                                ATTRIBUTS
    //=========================================================================

    private _logPublishers: Array<LogPublisher> = new Array<LogPublisher>();
    private _logLevel: LogLevel = LogLevel.ALL;
    private _logWithDate: boolean = true;

    //#endregion

    //#region
    //=========================================================================
    //                                METHODES
    //=========================================================================

    constructor(private readonly logPublisher: LogPublishersService) {
        this._logPublishers = this.logPublisher.publishers;
    }

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

    //#region ------------------------ LOGGING METHODES -----------------------


    private _shouldLog(level: LogLevel): boolean {
        return (level >= this._logLevel && level !== LogLevel.OFF)
            || this._logLevel === LogLevel.ALL;
    }

    private _writeToLog(msg: string, level: LogLevel, params: any[]) {
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
