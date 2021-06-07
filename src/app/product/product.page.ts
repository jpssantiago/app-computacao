import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  [x: string]: any;

  public product;
  public amount : number;

  constructor(
    private navController : NavController, 
    private toastController : ToastController, 
    route: ActivatedRoute,
    private userService: UserService,
    public productService: ProductsService,
  ) {
    const id = route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(id);
    this.amount = this.userService.getProductAmountInCart(this.product) || 1;
  }

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

  public addToCart = async () => {
    this.userService.updateCart(this.product, this.amount);

    this.navController.pop();

    const toast = await this.toastController.create({
      message: `Você adicionou ${this.amount} ${this.product.name} ao carrinho.`,
      duration: 3000,
    });

    toast.present();
  }

  public removeFromCart = async () => {
    this.userService.removeProductFromCard(this.product);

    this.navController.pop();

    const toast = await this.toastController.create({
      message: `Você removeu o item ${this.product.name} do carrinho.`,
      duration: 3000,
    });

    toast.present();
  }

  public updateCart = () => {
    if (this.amount > 0) {
      this.addToCart();
    } else {
      this.removeFromCart();
    }
  }
}
