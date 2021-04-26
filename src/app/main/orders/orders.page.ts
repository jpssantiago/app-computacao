import { Component, OnInit } from '@angular/core';
import getOrders from '../../../assets/data/orders';

interface Order {
  id: number,
  items: number, // Será uma lista de produtos. Product[]
  total: number,
  date: string,
  status: string,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public selectedFilter : 'all' | 'progress' | 'completed' = 'all';
  private orders : Order[] = getOrders();

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

  public getFilteredOrders = () : Order[] => {
    if (this.selectedFilter === 'all') {
      return this.orders;
    } else if (this.selectedFilter === 'progress') {
      return this.orders.filter(o => o.status === 'progress');
    } else {
      return this.orders.filter(o => o.status === 'completed');
    }
  }

  public getOrderStatus = (status : string) : string => {
    if (status === 'progress') {
      return 'Em andamento';
    } else {
      return 'Finalizado';
    }
  }
}
