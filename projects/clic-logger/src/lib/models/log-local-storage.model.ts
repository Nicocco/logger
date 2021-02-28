import { Observable, of } from "rxjs";
import { LogEntry } from "./log-entry.model";
import { LogPublisher } from "../class-base/log-publisher.base";

export class LogLocalStorage extends LogPublisher {
    constructor(keyName: string = 'logs') {
        super();
        this.location = keyName;
    }

    public log(entry: LogEntry): void {
        let sucess: boolean = false;
        let currentLogs: Array<LogEntry> = new Array<LogEntry>();

        try {
            const currentLogsStored: string | null = localStorage.getItem(this.location);
            if (currentLogsStored !== null) {
                currentLogs = JSON.parse(currentLogsStored);
            }
            currentLogs.push(entry);
            localStorage.setItem(this.location, JSON.stringify(currentLogs));
            sucess = true;
        } catch (ex) {
            console.warn(ex);
        }
    }

    public clear(): Observable<boolean> {
        localStorage.removeItem(this.location);
        return of(true);
    }
}
