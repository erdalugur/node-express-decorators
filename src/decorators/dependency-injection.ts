import { container } from '../container';

export function Injectable (token?: string): Function {
  return (target: { new () }) => {
    const instance = new target()
    token = token ? token : target.name.charAt(0).toLowerCase() + target.name.slice(1, target.name.length) 
    container.provide({ token, useValue: instance })
  }
}

export function Inject (token?: string) {
  return function(target: any, properyKey: string) {
    let key = token || properyKey
    Object.defineProperty(target, properyKey, {
      get: () => container.resolve<any>(key),
      enumerable: true,
      configurable: true
    });
  };
}