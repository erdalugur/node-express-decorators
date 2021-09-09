import { META_KEYS } from '../constants';
import { RouteDefinition, MethodDefinition, HttpMethods } from '../types'

function makeRouteMethod (options: MethodDefinition): MethodDecorator {
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
}