import * as express from 'express'
export enum HttpMethods { 
  GET = 'get', 
  POST = 'post', 
  DELETE = 'delete', 
  OPTIONS = 'options', 
  PUT = 'put' 
}

export interface RouteDefinition {
  path: string
  requestMethod: HttpMethods
  methodName: string
}

export interface MethodDefinition {
  path: string
  method: HttpMethods
}

export interface RootModuleOptions {
  port: number
  routes: Array<{ object: any, prefix?: string }>
}

export class AppServer { 
  port: number
  routes: Array<{ object: any, prefix?: string }>
  app: express.Application
}
export interface ContainerProvider {
  useValue: any;
  token: string;
}