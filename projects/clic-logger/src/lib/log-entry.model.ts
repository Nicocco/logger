import { LogLevel } from "./logger.enum";

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

    //#endregion

    //#region ---------------------------- METHODES -----------------------------

    public buildLogString(): string {
        let logValue: string = "";
        if (this._logWithDate) {
            logValue = new Date() + " - ";
        }
        logValue += "Type: " + LogLevel[this._level];
        logValue += " - Message: " + this._message;
        if (this._extraInfo.length) {
            logValue += " - Extra Info: "
                + this._formatParams(this._extraInfo);
        }

        return logValue;
    }

    private _formatParams(params: any[]): string {
        let formatedParams: string = params.join(",");

        if (params.some(p => typeof p == "object")) {
            formatedParams = "";
            for (let item of params) {
                formatedParams += JSON.stringify(item) + ",";
            }
        }

        return formatedParams;
    }

    //#endregion
}
