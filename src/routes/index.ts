import { Request, Response } from "express";
import { Route, Get, Post, Put, Delete, Options } from "../decorators";

@Route('/')
export default class Index {
  @Get('/')
  get (req: Request, res: Response) {
    res.send('hello get request :))')
  }

  @Post('/')
  post (req: Request, res: Response) {
    res.send('Hello post request :))')
  }
  @Put('/')
  put (req: Request, res: Response) {
    res.send('Hello put request :))')
  }
  @Delete('/')
  delete (req: Request, res: Response) {
    res.send('Hello delete request :))')
  }
  @Options('/')
  options (req: Request, res: Response) {
    res.send('Hello options request :))')
  }
}