import { Application, Request, Response, NextFunction } from 'express'
import { getAllFiles } from '../utils'
import { RouteDefinition,  } from '../types'
import { getInjectionsPerRequest, Injector } from '../decorators'
import { META_KEYS } from '../constants'


export function register ({ expressInstance, controllersDir, rootPrefix = '/api' }: { expressInstance: Application, controllersDir: string, rootPrefix?: string}) {
  const controllers = getAllFiles(controllersDir,[])
  controllers.forEach(c => {
    const obj = require(c.path)
    const controller = obj.default || class {}

    // register api routes
    const prefix = Reflect.getMetadata(META_KEYS.PREFIX, controller) || c.name
    const apiRoutes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, controller) || []
    apiRoutes.forEach(({ methodName, requestMethod, path }) => {
      const instance = Injector.resolve(controller)
      const route = `${rootPrefix}${prefix}${path}`
      expressInstance[requestMethod](route, async (req: Request, res: Response, next: NextFunction) => {
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

    return expressInstance
}