import { container } from '../container';

export function Injectable (token: string): Function {
  return (target: { new () }) => {
    const instance = new target()
    container.provide({ token, useValue: instance })
  }
}

export function Inject (token: string) {
  return function(target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.resolve<any>(token),
      enumerable: true,
      configurable: true
    });
  };
}