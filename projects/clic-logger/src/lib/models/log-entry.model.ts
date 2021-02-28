import { LogLevel } from "../enum/logger.enum";
import { format } from 'date-fns'

export class LogEntry {

    //#region
    //===========================================================================
    //                                ATTRIBUTS
    //===========================================================================

    //#region ---------------------------- PRIVATES -----------------------------

    private _level!: LogLevel;
    private _extraInfo: Array<any> = new Array<any>();
    private _logWithDate!: boolean;
    private _message!: string;

    //#endregion

    //#region
    //===========================================================================
    //                                METHODES
    //===========================================================================

    constructor(message: string,
        level: LogLevel = LogLevel.DEBUG,
        logWithDate: boolean = true,
        extraInfo: Array<any> = new Array<string>()
    ) {
        this._message = message;
        this._level = level;
        this._logWithDate = logWithDate;
        this._extraInfo = extraInfo;
    }

    //#region ---------------------------- GETTERS ------------------------------

    public get level(): LogLevel {
      return this._level;
    }

    public get message(): string {
      return this._message;
    }

    public get extraInfo(): Array<any> {
      return this._extraInfo;
    }

    //#endregion

    //#region ---------------------------- METHODES -----------------------------

    public buildLogString(): string {
        let logValue: string = "";
        if (this._logWithDate) {
            logValue += "["
            + format(new Date(), 'HH:mm:ss.SSS')
            + "] ";
        }
        logValue += LogLevel[this._level];
        logValue += " : " + this._message;

        return logValue;
    }

    //#endregion
}
