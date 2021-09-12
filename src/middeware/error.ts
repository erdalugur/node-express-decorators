import * as express from 'express'
import { HttpException } from '../exceptions'
import { loggerService } from '../services'
import { HttpStatusCode } from '../types'

export function errorWrapper (fn: Function) {
  return (...args: any[]) => fn(...args).catch(args[2])
}
export async function logError (err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) {
  loggerService.log(err.message)
  next(err)
}
export async function errorHandler (err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) {
  return res.status(err.status || HttpStatusCode.InternalServer).json({ error: err.message })
}
