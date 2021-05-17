import { Injectable } from '@angular/core';
import Product from 'src/models/product';
import User from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = new User(1, 'João');

  public getCart() {
    return this.user.cart;
  }

  public updateCart(product: Product, amount: number = 1) {
    this.user.cart.set(product.id, amount);
  }

  public getProductAmountInCart(product: Product) {
    return this.user.cart.get(product.id);
  }

  public removeProductFromCard(product: Product) {
    this.user.cart.delete(product.id);
    console.log(this.user.cart);
  }

  constructor() { }
}
