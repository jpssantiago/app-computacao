import { Component, OnInit } from '@angular/core';

import Product from '../../models/product';
import getProducts from '../../assets/data/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public products : Product[] = getProducts().slice(0, 3);
  public deliveryTax = 6; // Temporário e estático.

  constructor() { }

  ngOnInit() {
  }

  public calculateProductsPrice = () : number => {
    let total = 0;

    this.products.map(product => total += product.price);

    return total;
  }

  public calculateTotalValue = () : number => {
    return this.calculateProductsPrice() + this.deliveryTax;
  }

  public finishOrder = () => {
    console.log('Concluir ordem.');
  }
}