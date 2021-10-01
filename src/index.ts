import 'reflect-metadata';
import { HttpException } from './exceptions';
import { loggerService } from './services';
import * as express from 'express'
import { register } from 'node-express-decorators'
import * as path from 'path'

let app = register({
  expressInstance: express(),
  controllersDir: path.join(__dirname, 'routes'),
  rootPrefix: '/api'
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
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