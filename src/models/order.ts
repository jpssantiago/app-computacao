import { NgModule } from '@angular/core';
import Product from './product';

export default class Order {
    id: number;
    items: Product[];
    total: number;
    dateOrder: Date;
    status: string;

    constructor(
        items: Product[], 
        total: number, 
        date: Date = new Date(),
        status: string = 'progress',
    ) { 
        this.items = items;
        this.total = total;
        this.dateOrder = date;
        this.status = status;
    }
}