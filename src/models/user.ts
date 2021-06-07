import Order from './order';
import Address from './address';

export default class User {
    id: number;
    name: string;
    email: string;
    address: Address;
    orders: Order[];
    cart: Map<string, number>; // Id do produto => quantidade

    constructor(
        name: string, 
        email: string,
        address: Address = new Address(),
        orders: Order[] = [],
    ) {
        this.name = name;
        this.email = email;
        this.address = new Address();
        this.address = address;
        this.orders = orders;
        this.cart = new Map<string, number>();
    }
}