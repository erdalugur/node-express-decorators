export class LoggerService {
  log (message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams)
  }
}