# @la-clic/logger

This project was created to provide a colorfull, strong typed and extendable logger for angular APP

## usage

*@la-clic/logger* comes as an injectable service. You can directly use it by setting it up in appComponent.ts constructor, and then inject it wherever you want.

```ts
import { LoggerService } from "@la-clic/logger";
import { LogLevel } from "@la-clic/logger";

constructor(private readonly _logger: LoggerService) {
  this._logger.setLogLevel(LogLevel.DEBUG);
  this._logger.enableDefaultLocalStorageLogs();
}
```

As a service, the configuration need to be done at the very top level, and not reset in other component.

## extend

*@la-clic/logger* is extendable. By default, the logger write in console. It has a buildin publisher for localstorage that can be enable by calling :

```ts
this._logger.enableDefaultLocalStorageLogs();
```

and disable by calling 

```ts
this._logger.disableDefaultLocalStorageLogs();
```

The ***LogPublisher*** abstract class let you create your own publisher.

```ts
public class MyCustomeLogger extends LogPublisher {
  constructor() { super(); }

  public log(entry: LogEntry): void {
    // your log logic and direction
  }

  pubic clear(): void {
    //your clear logic
  }
}
```

With such a class, you can log into a file, an API, ect. Just make your log logic according to LogLevel in the implementation of the log function.

Then, register your custome LoggerPublisher to the loggerService like so :

```ts
this._logger.addLoggerPublisher(new MyCustomLogger())
```

## Further help

To get more help, contact the CLIC packages owner
