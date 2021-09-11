import { Get, Route } from "../../decorators";
import { Request, Response } from "express";
@Route("/yeop")
export default class {
  @Get("/")
  public get (req: Request, res: Response ) {
    res.send("yeop index")
  }
}