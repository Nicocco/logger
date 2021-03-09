import { LogEntry } from "./log-entry.model";
import { LogPublisher } from "../class-base/log-publisher.base";
import { LogLevel } from "../enum/logger.enum";
import { LoggerColorSchema } from "../constants/logger-constant.constant";

export class LogConsole extends LogPublisher {

  constructor() { super(); }

  public log(entry: LogEntry): void {
    switch (entry.level) {
      case LogLevel.WARN: {
        this._displayLog(entry, LoggerColorSchema.WARN);
        break;
      }
      case LogLevel.INFO: {
        this._displayLog(entry, LoggerColorSchema.INFO);
        break;
      }
      case LogLevel.ERROR: {
        this._displayLog(entry, LoggerColorSchema.ERROR);
        break;
      }
      case LogLevel.FATAL: {
        this._displayLog(entry, LoggerColorSchema.FATAL);
        break;
      }
      case LogLevel.DEBUG:
      case LogLevel.ALL: {
        this._displayLog(entry, LoggerColorSchema.DEBUG);
        break;
      }
      default: {
        throw new Error("Error : LogConsole.log(...), unknow log level '" + entry.level + "'");
      }
    }
  }

  public clear(): void {
    console.clear();
  }

  private _displayLog(entry: LogEntry, colorSchema: string): void {
    if (entry.extraInfo !== undefined
      && entry.extraInfo !== null
      && entry.extraInfo.length > 0) {
      console.groupCollapsed("%c" + entry.buildLogString(), colorSchema);
      entry.extraInfo.forEach((info: any) => { console.log(info); });
      console.groupEnd();
    } else {
      console.log("%c" + entry.buildLogString(), colorSchema);

    }
  }
}
