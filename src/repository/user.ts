import { Injectable } from "../base";

@Injectable("userRepository")
export class UserRepository {
  name: string = "ugur"
  surname: string = "erdal"

  public getFullName() {
    return `${this.name} ${this.surname}`
  }
}