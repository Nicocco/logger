import { LogEntry } from "./log-entry.model";
import { LogPublisher } from "../class-base/log-publisher.base";
import { LogLevel } from "../enum/logger.enum";
import { LoggerColorSchema } from "../constants/logger-constant.constant";

export class LogConsole extends LogPublisher {

  public log(entry: LogEntry): void {
    switch (entry.level) {
      case LogLevel.WARN: {
        console.log("%c" + entry.buildLogString(), LoggerColorSchema.WARN);
        break;
      }
      case LogLevel.INFO: {
        console.log("%c" + entry.buildLogString(), LoggerColorSchema.INFO);
        break;
      }
      case LogLevel.ERROR: {
        console.log("%c" + entry.buildLogString(), LoggerColorSchema.ERROR);
        break;
      }
      case LogLevel.FATAL: {
        console.log("%c" + entry.buildLogString(), LoggerColorSchema.FATAL);
        break;
      }
      case LogLevel.DEBUG :{
        console.log("%c" + entry.buildLogString(), LoggerColorSchema.DEBUG);
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
}
