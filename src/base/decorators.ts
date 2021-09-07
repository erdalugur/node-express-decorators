import * as express from 'express'
import { META_KEYS } from './constants';
import { container } from './container';
import { RouteDefinition, MethodDefinition, RootModuleOptions, HttpMethods } from './types'

export function Route (prefix: string = ''): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);

    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
  };
};

export function RootModule (options: RootModuleOptions) {
  return function (target: Function) { 
    const app = express()
    options.routes.forEach(route => {
      const instance                       = new route.object();

      const prefix: string                 = Reflect.getMetadata(META_KEYS.PREFIX, route.object) || route.prefix
      
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, route.object)
      if (!prefix) {
        console.error('prefix is required on your route')
      }
      routes.forEach(route => {
        app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response, next: express.NextFunction) => {
          instance[route.methodName](req, res, next)
        })
      })
    })
    target.prototype.app = app
    target.prototype.routes = options.routes
    target.prototype.port = options.port
  }
}

function makeRouteMethod (options: MethodDefinition) {
  return (target, propertyKey: string): void => {
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target.constructor)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target.constructor);
    }

    const routes = Reflect.getMetadata(META_KEYS.ROUTES, target.constructor) as Array<RouteDefinition>;

    routes.push({
      requestMethod: options.method,
      path: options.path,
      methodName: propertyKey
    });
    Reflect.defineMetadata(META_KEYS.ROUTES, routes, target.constructor);
  };
}

export function Get (path: string): MethodDecorator {
  return makeRouteMethod({ method: HttpMethods.GET, path: path})
};

export function Post (path: string): MethodDecorator {
  return makeRouteMethod({ method: HttpMethods.POST, path: path})
};

export function Put (path: string): MethodDecorator {
  return makeRouteMethod({ method: HttpMethods.PUT, path: path})
};

export function Delete (path: string): MethodDecorator {
  return makeRouteMethod({ method: HttpMethods.DELETE, path: path})
};

export function Options (path: string): MethodDecorator {
  return makeRouteMethod({ method: HttpMethods.OPTIONS, path: path})
};


export function Injectable (token: string): Function {
  return (target: { new () }) => {
    const instance = new target()
    container.provide({ token, useValue: instance })
  }
}

export function Inject(token: string) {
  return function(target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.resolve(token),
      enumerable: true,
      configurable: true
    });
  };
}