import { ContainerProvider } from "./types";


export class Container {
  private _providers: { [key: string]: any } = {};

  public resolve(token: string) {
    const matchedProvider = this._providers[token]
    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }
  public provide(details: ContainerProvider): void {
    this._providers[details.token] = details.useValue;
  }
}

export const container = new Container();