import * as express from 'express'
import { META_KEYS } from '../constants';
import { RouteDefinition, AppModuleOptions } from '../types'

export const expressInstance = express()

export function Route (prefix: string = ''): ClassDecorator {
  return (target: any) => {
    prefix = prefix ? prefix : target.name
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
  };
};

export function AppModule (options: AppModuleOptions): ClassDecorator {
  return function (target: Function) { 
    if(options.bodyParserOptions)
      expressInstance.use(express.json(options.bodyParserOptions))
    
    options.routes.forEach(route => {
      const instance = new route.object();
      const prefix: string = Reflect.getMetadata(META_KEYS.PREFIX, route.object) || route.prefix
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, route.object)

      if (!prefix) {
        console.error('prefix is required on your route')
      }
      routes.forEach(route => {
        expressInstance[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response, next: express.NextFunction) => {
          instance[route.methodName](req, res, next)
        })
      })
    })
    target.prototype.app = expressInstance
    target.prototype.routes = options.routes
    target.prototype.port = options.port
  }
}