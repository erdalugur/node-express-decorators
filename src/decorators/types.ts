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