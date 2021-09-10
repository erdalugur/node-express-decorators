import { ContainerProvider } from "../types";

export class Container {
  private _providers: Map<string, any>
  constructor() {
    this._providers = new Map()
  }

  public resolve<T>(token: string): T {
    const matchedProvider = this._providers.get(token)
    if (matchedProvider) {
      return matchedProvider as T;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }
  
  public provide(details: ContainerProvider): void {
    this._providers.set(details.token, details.useValue)
  }

  public has (token: string): boolean {
    return this._providers.has(token)
  }

  public delete (token: string): boolean {
    return this._providers.delete(token)
  }
  public clear () {
    this._providers.clear()
  }
}

export const container = new Container();