import 'reflect-metadata';
import { HttpException } from './exceptions';
import { loggerService } from './services';
import express from 'express'
import { useController } from 'node-express-decorators'
import path from 'path'

const app = express()

app.use('/api', useController(path.join(__dirname, 'routes')))

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