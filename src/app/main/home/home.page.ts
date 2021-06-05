import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import getProducts from '../../../assets/data/products';

import Product from '../../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedFilter: string = 'todos';
  private products : Product[] = getProducts();
  public categories : string[] = ['lanches', 'pizzas', 'sobremesas', 'bebidas'];

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  public getMessage = (): string => {
    const hour = new Date().getHours();

    if (hour >= 1 && hour < 12) {
      return 'Bom dia';
    } else if (hour >= 12 && hour < 19) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  public getPopularProducts() {
    return this.products.filter(product => {
      return product.price <= 20;
    });
  }

  public getFilteredProducts(filter: string) : Product[] {
    return this.products.filter(p => p.type === filter);
  }

  public openAddressPage = () => {
  }

  public capitalizeCategoryName(category: string): string {
    return category.substring(0, 1).toUpperCase() + category.substring(1);
  }
}