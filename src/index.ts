import 'reflect-metadata'
import { Application } from './application'
import { Index, UserRoute } from './routes'

const port = 3000

const app = new Application(port)

app.useRoute([
  { object: Index },
  { object: UserRoute }
])

app.listen()