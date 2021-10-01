import { UserDto } from "../types"
export class UserService {
  private readonly users:UserDto[] = [{ firstName: 'Uğur', lastName: 'Erdal', id: 1 }]

  public getAll () {
    return this.users
  }

  public getById(id: number) {
    return this.users.find(x => x.id == id)
  }

  public add(user: UserDto) {
    return this.users.push(user)
  }
}