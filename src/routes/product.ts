import { Controller, Get, Post, Body, Param } from "node-express-decorators";
import { ProductService } from "../services";
import { ProductDto } from "../types";
@Controller({ prefix: '/product'})

export default class ProductRoute {
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