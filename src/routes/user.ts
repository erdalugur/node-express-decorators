import { Route, Get, Param, Post, Body } from "../decorators";
import { UserService } from "../services";
import { UserDto } from "../types";

@Route('/user')
export default class UserRoute {
  constructor(
    private userService: UserService
    ) {}

  @Get('/')
  get() {
    return this.userService.getAll()
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id)
  }

  @Post('/')
  post(@Body() user: UserDto) {
    return this.userService.add(user)
  }
}