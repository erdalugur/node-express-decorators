import 'reflect-metadata'
import { META_KEYS } from '../constants';
import { ControllerOptions } from '../types'

export function Controller ({ prefix = ''}: ControllerOptions): ClassDecorator {
  return (target: Function) => {
    prefix = prefix ? prefix : target.name
    
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);
    
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
  };
};

export function ViewHandler (viewModules: string[]): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!Reflect.hasMetadata(META_KEYS.ROUTES, target.constructor)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target.constructor);
    }
    
    Reflect.defineMetadata(META_KEYS.VIEW_MODULES, viewModules, target.constructor);
    Reflect.defineMetadata(META_KEYS.VIEW_HANDLER, propertyKey, target.constructor)
  };
}