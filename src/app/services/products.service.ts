import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Product from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product[];
  public categories: string[];

  constructor(private firebaseStorage: AngularFirestore) {
    this.loadCategories();
    this.loadProducts();
  }

  public async loadProducts() {
    const products = [];

    const collection = this.firebaseStorage.collection('products');
    const subscription = collection.valueChanges().subscribe(data => {
      data.forEach(function({ id, name, price, image, type, description }) {
        const product: Product = new Product();
        product.id = id;
        product.name = name;
        product.price = price;
        product.image = image;
        product.type = type;
        product.description = description;
        
        products.push(product);
      });
      subscription.unsubscribe();
    });

    this.products = products;
  }

  public async loadCategories() {
    const categories = [];

    const collection = this.firebaseStorage.collection('categories');
    const subscription = collection.valueChanges().subscribe(data => {
      data.forEach(function({ name }) {
        categories.push(name);
      });
      subscription.unsubscribe();
    });
    
    this.categories = categories;
  }

  public getProductById(id: string) {
    let item: Product;

    this.products.map(product => {
      if (product.id == id) {
        item = product;
      }
    });

    return item;
  }
}
