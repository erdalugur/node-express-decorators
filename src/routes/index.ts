import { Request, Response } from "express";
import { Route, Get, Post, Put, Delete, Options } from "../decorators";
import { UnAuthorizedException } from "../exceptions";

@Route('/')
export default class Index {
  @Get('/')
  get (res: Response) {
    console.log(res.json)
    throw new UnAuthorizedException()
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