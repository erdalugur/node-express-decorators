### Meta programlama kavramlarından [decoratorleri](https://www.typescriptlang.org/docs/handbook/decorators.html) kullanarak bir express.js uygulaması oluşturmak.

### AppModule (Uygulamanın Kök Decoratorü)
- Bu decorator uygulamanın gerekli parametreleri ile birlikle express örneği alır ve uygulandığı sınıfa özellik olarak aktarır.
- Tıpkı Next.js'de olduğu gibi, routes klasörünün altında tanımlı tüm dosyaları okuyup route olarak express'e bildirir.
- Hata yakalama ve loglama tanımları merkezi olarak burada tanımlanmıştır.

### Kaynak Kod
```` js
export function AppModule (options: AppModuleOptions): ClassDecorator {
  return function (target: Function) { 
    if(options.bodyParserOptions)
      expressInstance.use(express.json(options.bodyParserOptions))
    
    const routesPath = resolveApp("../routes")
    const routeNames = getAllFiles(routesPath, [])

    routeNames.forEach(filePath => {
      // clean the file extension
      filePath = filePath.split(".")[0]
      const object = require(filePath).default
      const instance = Injector.resolve<any>(object)
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, object) || []
      
      routes.forEach(route => {
        const prefix = Reflect.getMetadata(META_KEYS.PREFIX, object) || filePath.slice(filePath.lastIndexOf("/"))
        const path = prefix + route.path
        expressInstance[route.requestMethod](path, errorWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          
          const props = [req, res, next]
          instance[route.methodName](...props)
        }))
      })
    })
    // error handling
    expressInstance.use(logError)
    expressInstance.use(errorHandler)
    
    target.prototype.app = expressInstance
    target.prototype.port = options.port
  }
}

````
### Kullanım
```js
/// Application.ts

import 'reflect-metadata';
import { AppModule } from './decorators';
import { AppServer } from './types';
import { loggerService } from './services';

@AppModule({
  port: 3000,
  bodyParserOptions: {
    limit: "100mb"
  }
})
export class Application extends AppServer {
  constructor() { 
    super()
  }
  
  listen () {
    this.app.listen(this.port, () => {
      loggerService.log(`application listening on http://localholst:${this.port}`)
    })
  }
}

```
### Http Method Decoratorlerimiz
* Get
* Post
* Put
* Options
* Delete


### Kaynak Kod
```js
// http-methods.ts

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
```

### Kullanım
```js 
/// routes/user.ts
/// Önemli Not: Uygulama başlarken default olarak dışa aktarılan object route olarak kabul edilir, bu sebeble class default olarak dışarı aktarılmalı.

import { Request, Response } from "express";
import { Route, Get, Post, Put, Delete, Options } from "../decorators";
import { ProductService, UserService } from "../services";

@Route('/user')
export default class UserRoute {
  constructor(
    private userService: UserService, 
    private productService: ProductService,
    ) {}

  @Get('/')
  get (req: Request, res: Response) {
    res.send(this.userService.getFullName())
  }
  
  @Get('/products')
  products (req: Request, res: Response) {
    res.send(this.productService.getAll())
  }

  @Get('/:id')
  getById (req: Request, res: Response) {
    const { id } = req.params
    res.send('hello user request :))' + id)
  }

  @Post('/')
  post (req: Request, res: Response) {
    res.send('Hello user request :))')
  }

  @Put('/')
  put (req: Request, res: Response) {
    res.send('Hello user request :))')
  }

  @Delete('/')
  delete (req: Request, res: Response) {
    res.send('Hello user request :))')
  }
  
  @Options('/')
  options (req: Request, res: Response) {
    res.send('Hello user request :))')
  }
}
```

### Bağımlılık Enjeksiyonu(Dependency Injection)
```js
// dependecy-injection.ts
    
export const Injector = new class {
  // resolving instances
  resolve<T>(target: any): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
        injections = tokens.map(token => Injector.resolve<any>(token));
    
    return new target(...injections);
  }
}
```
### Kullanım
```js 
// Basit kullanım
const instance = Injector.resolve<any>(object)

// Dinamik olarak oluşturulan rotaların enjeksiyonları

routeNames.forEach(filePath => {
      // clean the file extension
      filePath = filePath.split(".")[0]
      const object = require(filePath).default
      >>>
      const instance = Injector.resolve<any>(object)
      <<<
      const routes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, object) || []
      
      routes.forEach(route => {
        const prefix = Reflect.getMetadata(META_KEYS.PREFIX, object) || filePath.slice(filePath.lastIndexOf("/"))
        const path = prefix + route.path
        expressInstance[route.requestMethod](path, errorWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          
          const props = [req, res, next]
          instance[route.methodName](...props)
        }))
      })
    })

// Enjeksiyonların rotalarda kullanılması
@Route('/user')
export default class UserRoute {
  constructor(
    private userService: UserService, 
    private productService: ProductService,
    ) {}
  @Get('/')
  get (req: Request, res: Response) {
    res.send(this.userService.getFullName())
  }
}
```
### Son olarak; Express.js ve Typescript kullanarak decoratorleri nasıl kullanabiliriz sorusunun cevabını arayan geliştiriciler için bir repo oluşturdum. İlham aldığım ve daha profesyonel bir framework olan [Nest.js](https://nestjs.com/)'e bir göz atmanızı tavsiye ederim.
