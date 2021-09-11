export class ProductRepository {
  private items: string[] = ["apple", "orange"]

  public getAll() {
    return this.items
  }
}