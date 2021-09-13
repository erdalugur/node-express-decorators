import * as express from 'express'
import { Injector } from './dependency-injection';
import { META_KEYS } from '../constants';
import { RouteDefinition, AppModuleOptions } from '../types'
import { resolveApp, getAllFiles } from '../utils'
import { errorHandler, errorWrapper, logError } from '../middeware';

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
    
    const routesPath = resolveApp("../routes")
    const routeNames = getAllFiles(routesPath, [])

    routeNames.forEach(filePath => {
      // clean the file extension
      filePath = filePath.split(".")[0]
      const object = require(filePath).default
      const instance = Injector.resolve<any>(object)
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, object) || []
      
      routes.forEach(route => {
        const prefix = Reflect.getMetadata(META_KEYS.PREFIX, object) || filePath.slice(filePath.lastIndexOf("/"))
        const path = prefix + route.path
        expressInstance[route.requestMethod](path, errorWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          
          const props = [req, res, next]
          instance[route.methodName](...props)
        }))
      })
    })
    // error handling
    expressInstance.use(logError)
    expressInstance.use(errorHandler)
    
    target.prototype.app = expressInstance
    target.prototype.port = options.port
  }
}
