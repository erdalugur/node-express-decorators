import { ProductDto } from "../types"

export class ProductService {
  private readonly items: ProductDto[] = [{ name: 'apple', price: 2, id: 1 }, { name: 'banana', price: 12, id: 2 }]

  public getAll() {
    return this.items
  }

  add (product: ProductDto) {
    return this.items.push(product)
  }
  getById (id: number) {
    return this.items.find(x => x.id == id)
  }
}