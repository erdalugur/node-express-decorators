import 'reflect-metadata'
import { META_KEYS } from '../constants';
import { InjectPerRequest } from '../types'

// eslint-disable-next-line new-parens
export const Injector = new class {
  // resolving instances
  resolve (target: any): any {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens: any = Reflect.getMetadata('design:paramtypes', target) || [],
        injections = tokens.map((token: any) => Injector.resolve(token));

    return new target(...injections);
  }
}


export function getInjectionsPerRequest ({ instance, methodName, next, req, res }: InjectPerRequest ) {
  const props: any[] = []
              
  if(Reflect.hasMetadata(META_KEYS.BODY, instance, methodName)) {
    const index = Reflect.getMetadata(META_KEYS.BODY, instance, methodName)
    props[index] = req.body
  }
  if(Reflect.hasMetadata(META_KEYS.PARAM, instance, methodName)){
    const { parameter, index } = Reflect.getMetadata(META_KEYS.PARAM, instance, methodName)
    props[index] = req.params[parameter]
  }
  if(Reflect.hasMetadata(META_KEYS.REQUEST, instance, methodName)){
    const index = Reflect.getMetadata(META_KEYS.REQUEST, instance, methodName)
    props[index] = req
  }
  if(Reflect.hasMetadata(META_KEYS.RESPONSE, instance, methodName)){
    const index = Reflect.getMetadata(META_KEYS.RESPONSE, instance, methodName)
    props[index] = res
  }
  if(Reflect.hasMetadata(META_KEYS.NEXT, instance, methodName)){
    const index = Reflect.getMetadata(META_KEYS.NEXT, instance, methodName)
    props[index] = next
  }
  return props
}