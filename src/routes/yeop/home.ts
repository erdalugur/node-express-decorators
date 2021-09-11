import { Get, Route } from "../../decorators";
import { Request, Response } from "express";
@Route("/yeop")
export default class {
  @Get("/home")
  public get (req: Request, res: Response ) {
    res.send("yeop home")
  }
}