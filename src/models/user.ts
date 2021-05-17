import Order from './order';
import Address from './address';

export default class User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: Address;
    orders: Order[];
    cart: Map<number, number>; // Id do produto => quantidade

    constructor(
        name: string, 
        email: string,
        password: string,
        address: Address = new Address(),
        orders: Order[] = [],
        cart: Map<number, number> = new Map<number, number>(),
    ) {
        this.name = name;
        this.email = email;
        this.address = new Address();
        this.password = password;
        this.address = address;
        this.orders = orders;
        this.cart = cart;
    }
}