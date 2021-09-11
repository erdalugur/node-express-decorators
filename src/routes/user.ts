import { Request, Response } from "express";
import { Route, Get, Post, Put, Delete, Options } from "../decorators";
import { ProductRepository, UserRepository } from "../repository";

@Route('/user')
export default class UserRoute {
  constructor(
    private userRepository: UserRepository, 
    private productRepository: ProductRepository 
    ) {}

  @Get('/')
  get (req: Request, res: Response) {
    res.send(this.userRepository.getFullName())
  }
  
  @Get('/products')
  products (req: Request, res: Response) {
    res.send(this.productRepository.getAll())
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