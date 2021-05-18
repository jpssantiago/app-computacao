import Product from './product';

export default class Order {
    id: number;
    items: Product[];
    total: number;
    date: string;
    status: string;

    constructor(
        items: Product[], 
        total: number, 
        date: string = `01/01/2021`, // Estático 
        status: string = 'progress'
    ) { 
        this.items = items;
        this.total = total;
        this.date = date;
        this.status = status;
    }
}