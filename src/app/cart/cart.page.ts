import { Component, OnInit } from '@angular/core';

import Product from '../../models/product';
import { UserService } from '../services/user.service';
import { NavController, ToastController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cart;
  public products : Product[] = []; // = getProducts().slice(0, 3);
  public deliveryTax = 6; // Temporário e estático.

  constructor(
    public userService: UserService,
    private toastController : ToastController, 
    private navController : NavController, 
    public productsService: ProductsService,
  ) {  
    this.cart = this.userService.getCart();

    for (let productId of this.cart.keys()) {
      const product = this.productsService.getProductById(productId);
      this.products.push(product);
    }
  }

  ngOnInit() {
  }

  public calculateProductPrice = (id: string): number => {
    const price = this.productsService.getProductById(id).price;
    return price * this.cart.get(id);
  }

  public calculateProductsSum = (): number => {
    let total = 0;

    for (let productId of this.cart.keys()) {
      total += this.calculateProductPrice(productId);
    }

    return total;
  }

  public calculateTotalValue = (): number => {
    return this.calculateProductsSum() + this.deliveryTax;
  }

  public finishOrder = async () => {
    const address = this.userService.user.address;
    if (!address.street || !address.number || !address.zip) {
      const toast = await this.toastController.create({
        message: `Você ainda não definiu o seu endereço.`,
        duration: 3000,
      });
      toast.present();
      return;
    }

    if (this.products.length == 0) {
      const toast = await this.toastController.create({
        message: `O seu carrinho está vazio no momento.`,
        duration: 3000,
      });
      toast.present();
      return;
    }

    this.userService.addOrder(this.products, this.calculateTotalValue());
    this.userService.clearCart();

    this.navController.pop();

    const toast = await this.toastController.create({
      message: `O seu pedido foi enviado para o restaurante. Acompanhe-o na área de pedidos.`,
      duration: 3000,
    });
    toast.present();
  }
}