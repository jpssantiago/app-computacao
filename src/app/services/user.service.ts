import { Injectable } from '@angular/core';
import Address from 'src/models/address';
import Order from 'src/models/order';
import Product from 'src/models/product';
import User from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  public setUser(name: string, email: string, address: Address = new Address(), orders: Order[] = []) {
    this.user = new User(name, email, address, orders);
  }

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

  public editAddress(zip: string, street: string, number: number, otherInfo: string) {
    const address = new Address();
    address.zip = zip;
    address.street = street;
    address.number = number;
    address.otherInfo = otherInfo;

    this.user.address = address; 
  }

  public editUser(name: string) {
    this.user.name = name;
  }

  constructor() { }
}
