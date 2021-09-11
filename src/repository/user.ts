export class UserRepository {
  private name: string = "ugur"
  private surname: string = "erdal" 

  public getFullName() {
    return `${this.name} ${this.surname}`
  }
}