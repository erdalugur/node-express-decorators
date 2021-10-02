# node-express-decorators

## Express.js ile birlikte kullanabileceğimiz bir dizi decorator modülüdür.


https://www.npmjs.com/package/node-express-decorators

- npm install reflect-metadata
- npm install node-express-decorators

## Kullanım

```
import 'reflect-metadata'
import * as express from 'express'
import { useController } from 'node-express-decorators'
import path from 'path'

const app = express()

app.use(useController(path.join(__dirname, 'routes')))

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

```

## Decorator Kullanımları

 ```
import { Controller, Get, Post, ViewHandler, Body, Param, Req, Res, Next  } from 'node-express-decorators'

@Controller({
  prefix: 'home'
}) 
class Example {
  @Post('/') // Post decorator örneği 
  handler () {

  }
}

// Body decorator örneği  
class Example {
  @Post('/')
  handler (@Body() product: ProductDto ) {
    
  }
}

// Request decorator örneği  
class Example {
  @Get('/')
  handler (@Req() req: express.Request ) { 

  }
}

// Response decorator örneği  
class Example {
  @Get('/')
  handler (@Res() res: express.Response ) {

  }
}

// Next decorator örneği  
class Example {
  @Get('/')
  handler (@Next() next: express.NextFunction ) {

  }
}

// Param decorator örneği  
class Example {
  @Get('/:id')
  handler (@Param('id') id: string ) {
      
  }
}
```
