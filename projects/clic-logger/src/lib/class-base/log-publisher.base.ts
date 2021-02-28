import { LogEntry } from "../models/log-entry.model";

export abstract class LogPublisher {
  public location!: string;
  abstract log(record: LogEntry): void;
  abstract clear(): void;
}
