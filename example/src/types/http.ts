export enum HttpStatusCode {
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServer = 500
}
export enum HttpMethods { 
  GET = 'get', 
  POST = 'post', 
  DELETE = 'delete', 
  OPTIONS = 'options', 
  PUT = 'put'
}