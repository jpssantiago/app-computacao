import { Component, OnInit } from '@angular/core';
import getProducts from '../../../assets/data/products';

interface Product {
  id: number,
  name: string,
  price: number,
  image: string,
  type: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedFilter: string = 'todos';
  private products : Product[] = getProducts();

  constructor() { }

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

  public getFilteredProducts(filter) : Product[] {
    return this.products.filter(p => p.type === filter);
  }

  public openAddressPage = () => {
  }
}