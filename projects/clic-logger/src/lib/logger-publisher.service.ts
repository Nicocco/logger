import { Injectable } from "@angular/core";
import { LogConsole } from "./log-console.model";
import { LogLocalStorage } from "./log-local-storage.model";
import { LogPublisher } from "./log-publisher.base";

@Injectable({providedIn: 'root'})
export class LogPublishersService {

    private _publishers: Array<LogPublisher> = new Array<LogPublisher>();

    constructor() {
        this._buildPublishers();
    }

    public get publishers(): Array<LogPublisher> {
        return this._publishers;
    }

    private _buildPublishers(): void {
        this._publishers.push(new LogConsole());
        this._publishers.push(new LogLocalStorage());
    }
}