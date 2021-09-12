import { Application } from 'express'
import { HttpMethods } from './http'

export interface RouteDefinition {
  path: string
  requestMethod: HttpMethods
  methodName: string
}

export interface MethodDefinition {
  path: string
  method: HttpMethods
}

export interface BodyParserOptions {
  inflate?: boolean
  limit?: string | number
  reviver?(key: string, value: any): any
  strict?: boolean
  type?: string | string[] | ((req: any) => any)
  verify?(req: any, res: any, buf: Buffer, encoding: string): void
}

export interface RouteItem { object: any, prefix?: string }
export interface AppModuleOptions {
  port: number
  bodyParserOptions?: BodyParserOptions
}

export class AppServer { 
  port: number
  routes: Array<RouteItem>
  app: Application
}
export interface ContainerProvider {
  useValue: any;
  token: string;
}