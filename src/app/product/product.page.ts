import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import getProducts from '../../assets/data/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  [x: string]: any;

  public product = getProducts()[0];
  public amount : number = 1;

  constructor(private navController : NavController, private toastController : ToastController) { }

  ngOnInit() {
  }

  public back = () => {
    this.navController.pop();
    // this.router.navigate(['/main/home']);
  }

  public decrement = () => this.amount--;

  public increment = () => this.amount++;

  public calculateTotalPrice = () : number => {
    let price = this.product.price;
    return price * this.amount;
  }

  public addToCart = async () => {
    console.log(`Adicionar ${this.amount} no carrinho por ${this.calculateTotalPrice()}.`);

    this.navController.pop();

    const toast = await this.toastController.create({
      message: 'Produto adicionado ao carrinho.',
      duration: 3000,
    });

    toast.present();
  }
}
