export class ProductService {
  private items: string[] = ["apple", "orange"]

  public getAll() {
    return this.items
  }
}