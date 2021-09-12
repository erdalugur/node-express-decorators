import { UnAuthorizedException } from "../exceptions"

export class UserService {
  private name: string = "ugur"
  private surname: string = "erdal" 

  public getFullName() {
    throw new UnAuthorizedException()
  }
}