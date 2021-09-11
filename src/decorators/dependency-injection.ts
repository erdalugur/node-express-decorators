export const Injector = new class {
  // resolving instances
  resolve<T>(target: any): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
        injections = tokens.filter(x => x !== undefined).map(token => Injector.resolve<any>(token));
    
    return new target(...injections);
  }
}