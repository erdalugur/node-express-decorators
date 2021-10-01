class LoggerService {
  log (message?: any, ...optionalParams: any[]) {
    // your logic here
    console.log(message, ...optionalParams)
  }
}
export const loggerService = new LoggerService()