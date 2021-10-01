import 'reflect-metadata'
import { META_KEYS } from '../constants';
import { RouteDefinition, MethodDefinition, HttpMethods } from '../types'

function makeRouteMethod (options: MethodDefinition): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!Reflect.hasMetadata(META_KEYS.ROUTES, target.constructor)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target.constructor);
    }

    const routes = Reflect.getMetadata(META_KEYS.ROUTES, target.constructor) as Array<RouteDefinition> || [];
    routes.push({
      requestMethod: options.method,
      path: options.path,
      methodName: propertyKey as string
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

function createParameterDecorator (metaKey: string | Symbol): ParameterDecorator {
  return (target, key, index) => {
    Reflect.defineMetadata(metaKey, index, target, key)
  }
}

/**
 * @example
 * testMethod(@Body() test: test)
 */
export const Body = (): ParameterDecorator => createParameterDecorator(META_KEYS.BODY)
/**
 * @example
 * testMethod(@Req() req: express.Request)
 */
export const Req = (): ParameterDecorator => createParameterDecorator(META_KEYS.REQUEST)
/**
 * @example
 * testMethod(@Res() res: express.Response)
 */
export const Res = (): ParameterDecorator => createParameterDecorator(META_KEYS.RESPONSE)
/**
 * @example
 * testMethod(@Next() next: express.NextFunction)
 */
export const Next = (): ParameterDecorator => createParameterDecorator(META_KEYS.NEXT) 

/**
 * @example
 * testMethod(@Param('id') id: string)
 */
export function Param (parameter: string): ParameterDecorator {
  return (target, key, index) => {
    Reflect.defineMetadata(META_KEYS.PARAM, { parameter, index }, target, key)
  }
}