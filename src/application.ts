import 'reflect-metadata';
import { RootModule, AppServer } from './base';
import { Index, UserRoute } from './routes';
@RootModule({
  port: 3000,
  routes: [
    { object: Index},
    { object: UserRoute }
  ]
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
