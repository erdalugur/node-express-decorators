import 'reflect-metadata';
import { AppModule } from './decorators';
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
