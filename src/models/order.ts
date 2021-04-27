import Product from './product';

export default class Order {
    id: number;
    items: Product[];
    total: number;
    date: string;
    status: string;
}