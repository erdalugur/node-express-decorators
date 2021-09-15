import 'reflect-metadata';
import { AppModule } from './decorators';
import { HttpException } from './exceptions';
import { loggerService } from './services';
import { AppServer } from './types';

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
    const app = this.create()
    app.listen(this.port, () => {
      loggerService.log(`application listening on http://localhost:${this.port}`)
    })
  }
}


process.on('unhandledRejection', error => {
  loggerService.log("unhandledRejection", error)
  throw error
})

process.on('uncaughtException', (error: HttpException) => {
  loggerService.log("uncaughtException", error)
  if (!error.trustedException) {
    process.exit(1)
  }
})