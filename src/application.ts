import 'reflect-metadata';
import { AppModule } from './decorators';
import { Index, UserRoute } from './routes';
import { AppServer } from './types';
@AppModule({
  port: 3000,
  routes: [
    { object: Index},
    { object: UserRoute }
  ],
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
