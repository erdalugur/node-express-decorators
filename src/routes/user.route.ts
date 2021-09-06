import { Request, Response } from "express";
import { Route, Get, Post, Put, Delete, Options } from "../decorators";

@Route('/user')
export class UserRoute {
  @Get('/')
  get (req: Request, res: Response) {
    res.send('hello user request :))')
  }

  @Get('/:id')
  getById (req: Request, res: Response) {
    const { id } = req.params
    res.send('hello user request :))' + id)
  }

  @Post('/')
  post (req: Request, res: Response) {
    res.send('Hello user request :))')
  }

  @Put('/')
  put (req: Request, res: Response) {
    res.send('Hello user request :))')
  }

  @Delete('/')
  delete (req: Request, res: Response) {
    res.send('Hello user request :))')
  }
  
  @Options('/')
  options (req: Request, res: Response) {
    res.send('Hello user request :))')
  }
}