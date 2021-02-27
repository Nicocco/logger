import { Observable, of } from "rxjs";
import { LogEntry } from "./log-entry.model";
import { LogPublisher } from "./log-publisher.base";

export class LogConsole extends LogPublisher {
    
    public log(entry: LogEntry): Observable<boolean> {
        console.log(entry.buildLogString());
        return of(true);
    }

    public clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }
}