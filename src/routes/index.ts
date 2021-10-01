import { Controller, Get, Post, Put, Delete, Options } from "node-express-decorators";
@Controller({ prefix: '/'})
export default class Index {
  @Get('')
  get () {
    return 'Hello get request :))'
  }

  @Post('')
  post () {
    return 'Hello post request :))'
  }
  @Put('')
  put () {
    return 'Hello put request :))'
  }
  @Delete('')
  delete () {
    return 'Hello delete request :))'
  }
  @Options('')
  options () {
    return 'Hello options request :))'
  }
}