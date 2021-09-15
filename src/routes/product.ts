import { Route, Get, Post, Body, Param } from "../decorators";
import { ProductService } from "../services";
import { ProductDto } from "../types";

@Route('/product')
export default class UserRoute {
  constructor(
    private productService: ProductService,
    ) {}

  @Get('/')
  get () {
    return this.productService.getAll()
  }

  @Get('/:id')
  getById (@Param('id') id: number) {
    return this.productService.getById(id)
  }

  @Post('/')
  post (@Body() product: ProductDto) {
    return this.productService.add(product)
  }
}