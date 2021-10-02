import { Request, Response, NextFunction, Router } from 'express'
import { getAllFiles } from '../utils'
import { RouteDefinition,  } from '../types'
import { getInjectionsPerRequest, Injector } from '../decorators'
import { META_KEYS } from '../constants'


const app = Router()

export function useController (controllerDir: string) {
  const controllers = getAllFiles(controllerDir,[])

  controllers.forEach(c => {
    const obj = require(c.path)
    const controller = obj.default || class {}

    // register api routes
    const prefix = Reflect.getMetadata(META_KEYS.PREFIX, controller) || c.name
    const apiRoutes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, controller) || []
    apiRoutes.forEach(({ methodName, requestMethod, path }) => {
      const instance = Injector.resolve(controller)
      const route = `${prefix}${path}`
      app[requestMethod](route, async (req: Request, res: Response, next: NextFunction) => {
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

    return app
}