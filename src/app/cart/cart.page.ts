import { Component, OnInit } from '@angular/core';

import Product from '../../models/product';
import getProducts from '../../assets/data/products';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cart;
  public products : Product[] = []; // = getProducts().slice(0, 3);
  public deliveryTax = 6; // Temporário e estático.

  constructor(public userService: UserService) {  
    this.cart = this.userService.getCart();

    for (let productId of this.cart.keys()) {
      this.products.push(getProducts()[productId]);
    }
  }

  ngOnInit() {
  }

  public calculateProductPrice = (id: number): number => {
    const price = getProducts()[id].price;
    return price * this.cart.get(id);
  }

  public calculateProductsSum = () : number => {
    let total = 0;

    for (let productId of this.cart.keys()) {
      total += this.calculateProductPrice(productId);
    }

    return total;
  }

  public calculateTotalValue = () : number => {
    return this.calculateProductsSum() + this.deliveryTax;
  }

  public finishOrder = () => {
    console.log('Concluir ordem.');
  }
}