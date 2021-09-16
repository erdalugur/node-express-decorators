import * as express from 'express'
import { Injector, getInjectionsPerRequest } from './injector';
import { META_KEYS } from '../constants';
import { RouteDefinition, AppModuleOptions } from '../types'
import { resolveApp, getAllFiles } from '../utils'
import { errorHandler, logError } from '../middeware';

export function Route (prefix: string = ''): ClassDecorator {
  return (target: Function) => {
    prefix = prefix ? prefix : target.name
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
  };
};

export function AppModule (options: AppModuleOptions): ClassDecorator {
  return function (target: Function) { 
    const app = express()

    target.prototype.port = options.port
    target.prototype.create = () => {
      if(options.bodyParserOptions)
        app.use(express.json(options.bodyParserOptions))

      const routesPath = resolveApp("../routes")
      const routeNames = getAllFiles(routesPath, [])

      routeNames.forEach(filePath => {
        // clean the file extension
        filePath = filePath.split(".")[0]
        const object = require(filePath).default
        const instance = Injector.resolve<any>(object)
        const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, object) || []
        const prefix = Reflect.getMetadata(META_KEYS.PREFIX, object) || filePath.slice(filePath.lastIndexOf("/"))
        routes.forEach(({ methodName, requestMethod, path }) => {
          app[requestMethod](prefix + path, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
              const injections = getInjectionsPerRequest({ instance, methodName, req, res, next })
              const result = await instance[methodName](...injections)
              res.json(result)
            } catch (error) {
              next(error)
            }
          })
        })
      })
      
      // error handling
      app.use(logError)
      app.use(errorHandler)
      return app
    }
  }
}
