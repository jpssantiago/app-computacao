import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Product from 'src/models/product';
import Order from '../../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  initialDate: Date;
  finalDate: Date;
  ordemProduto: string = "";
  public selectedFilter : 'all' | 'progress' | 'completed' | 'data-search'= 'all';
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

  public getOrderByDate = (orders: Order[]) => {
    if (this.ordemProduto === 'anterior') {  
      return orders.sort(function(a, b) {
        return new Date(a.dateOrder).getTime() - new Date(b.dateOrder).getTime();
      });      
    } else if (this.ordemProduto === 'recente') {
      return orders.sort(function(a, b) {
        return new Date(b.dateOrder).getTime() - new Date(a.dateOrder).getTime();
      });
    }
    
    return orders;
  }

  public getFormattedDate = (date: Date): string => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  }

  public getOrderSum = () => {
    let total = 0;

    for (let order of this.getFilteredOrders()) {
      total += order.total;
    }

    return total.toFixed(2);
  }

  public getOrdersByDateInterval = (orders: Order[]) => {
    if (!this.initialDate || !this.finalDate) return [];

    const arr = orders.filter((order) => {
      const date = new Date(order.dateOrder);
      const initial = new Date(this.initialDate);
      const final = new Date(this.finalDate);

      if (date.getFullYear() >= initial.getFullYear() && date.getFullYear() <= final.getFullYear()) {
        if (date.getMonth() >= initial.getMonth() && date.getMonth() <= final.getMonth()) {
          if (date.getDate() >= initial.getDate() && date.getDate() <= final.getDate()) {
            return true;
          }
        }
      }
      return false;
    });

    return arr; 
  }

  public getFilteredOrders = () : Order[] => {
    if (this.orders.length == 0) return this.orders;

    if (this.selectedFilter === 'all') {
      return this.getOrderByDate(this.orders);
    } else if (this.selectedFilter === 'progress') {
      return this.getOrderByDate(this.orders.filter(o => o.status === 'progress'));
    } else if (this.selectedFilter === 'completed') {
      return this.getOrderByDate(this.orders.filter(o => o.status === 'completed'));
    } else {
      return this.getOrderByDate(this.getOrdersByDateInterval(this.orders));
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

