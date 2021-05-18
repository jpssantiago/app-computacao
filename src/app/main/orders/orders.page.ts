import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import Order from '../../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public selectedFilter : 'all' | 'progress' | 'completed' = 'all';
  private orders : Order[] = [];

  constructor(public userService: UserService) {
    this.orders = userService.user.orders;
  }

  ngOnInit() { }

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
    if (this.orders.length == 0) return this.orders;

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
