import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import getProducts from '../../assets/data/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public product = getProducts()[0];
  public amount : number = 1;

  constructor(private navController : NavController) { }

  ngOnInit() {
  }

  public back = () => {
    this.navController.pop();
  }

  public decrement = () => this.amount--;

  public increment = () => this.amount++;

  public calculateTotalPrice = () : number => {
    let price = this.product.price;
    return price * this.amount;
  }
}
