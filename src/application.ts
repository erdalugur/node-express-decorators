import 'reflect-metadata';
import * as express from 'express'
import { META_KEYS, RouteDefinition } from './decorators';

export class Application {
  app: express.Application
  port: number
  constructor(port: number) {
    this.app = express()
    this.port = port
  }

  useRoute (routes: Array<{ prefix?: string, object: any}>) {
    routes.forEach(route => {
      const instance                       = new route.object();

      const prefix: string                 = Reflect.getMetadata(META_KEYS.PREFIX, route.object) || route.prefix
      
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, route.object)
      if (!prefix) {
        console.error('prefix is required on your route')
      }
      routes.forEach(route => {
        this.app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response) => {
          instance[route.methodName](req, res)
        })
      })
    })
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`application listening on http://localholst:${this.port}`)
    })
  }
}
