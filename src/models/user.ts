import Order from './order';
import Address from './address';
import Product from './product';

interface Cart {
    [productId: number]: number;
}

export default class User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: Address;
    orders: Order[];
    cart: Map<number, number>; // Id do produto => quantidade
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.cart = new Map<number, number>();
        this.orders = [];
    }
}