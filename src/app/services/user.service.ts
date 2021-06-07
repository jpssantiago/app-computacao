import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';

import Address from 'src/models/address';
import Order from 'src/models/order';
import Product from 'src/models/product';
import User from 'src/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  public setUser(id: string, name: string, email: string, orders: Order[] = [], address: Address = new Address()) {
    this.user = new User(id, name, email, address, orders);
    this.loadAddressFromStorage();
  }

  public clearUser() {
    this.user = undefined;
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
  }

  public editAddress(zip: string, street: string, number: number, otherInfo: string) {
    const address = new Address();
    address.zip = zip;
    address.street = street;
    address.number = number;
    address.otherInfo = otherInfo;

    this.user.address = address; 
    this.saveAddressToStorage();
  }

  public editUser(name: string) {
    this.user.name = name;
  }

  public async loadAddressFromStorage() {
    const loadedAddress = await this.storage.get('address');
    if (loadedAddress) {
      const address = new Address();
      address.zip = loadedAddress.zip;
      address.street = loadedAddress.street;
      address.number = loadedAddress.number;
      address.otherInfo = loadedAddress.otherInfo;
      this.user.address = address;
    }
  }

  public saveAddressToStorage() { 
    this.storage.set('address', this.user.address);
  }

  public addOrder(items: Product[], total: number) {
    const order: Order = new Order(items, total);
    this.user.orders.push(order);
    this.saveOrders();
  }

  public clearCart() {
    this.user.cart = new Map<string, number>();
  }

  private saveOrders() {
    const collection = this.firebaseStorage.collection('users');
    const arr = JSON.parse(JSON.stringify(this.user.orders));
    collection.doc(this.user.id).update({ orders: arr });
  }

  constructor(private storage: Storage, private afa: AngularFireAuth, private firebaseStorage: AngularFirestore) { }

  getAuth(){
    return this.afa
  }
}
