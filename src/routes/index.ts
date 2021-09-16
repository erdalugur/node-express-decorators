import { Route, Get, Post, Put, Delete, Options } from "../decorators";
@Route('/')
export default class Index {
  @Get('/')
  get () {
    return 'Hello get request :))'
  }

  @Post('/')
  post () {
    return 'Hello post request :))'
  }
  @Put('/')
  put () {
    return 'Hello put request :))'
  }
  @Delete('/')
  delete () {
    return 'Hello delete request :))'
  }
  @Options('/')
  options () {
    return 'Hello options request :))'
  }
}