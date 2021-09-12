import 'reflect-metadata';
import { AppModule } from './decorators';
import { HttpException } from './exceptions';
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
    this.app.listen(this.port, () => {
      console.log(`application listening on http://localholst:${this.port}`)
    })
  }
}

process.on('unhandledRejection', error => {
  console.log("unhandledRejection")
  throw error
})

process.on('uncaughtException', (error: HttpException) => {
  if (!error.trustedException) {
    process.exit(1)
  }
})