import { Observable } from "rxjs";

export abstract class LogPublisher {
    public location: string = "UNKNOW";
    abstract log(record: any): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}