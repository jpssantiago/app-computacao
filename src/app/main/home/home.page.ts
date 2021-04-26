import { Component, OnInit } from '@angular/core';

interface Product {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedFilter: string = 'todos';
  public products : Product[] = [
    {
      id: 0,
      name: 'Batata Frita',
      price: 10,
      image: 'https://s2.glbimg.com/6TYFXwek9ZpNXFeOzas09KizMKk=/0x0:1280x853/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/T/K/Hh8h2GR96v392DAkAqyA/912c9713-321e-4dfd-bca9-888c05c5ce50.jpeg',
    },
    {
      id: 0,
      name: 'Frango a milanesa',
      price: 15,
      image: 'https://conteudo.imguol.com.br/c/entretenimento/40/2020/09/18/milanesa-frango-1600441360438_v2_1280x960.jpg',
    },
    {
      id: 0,
      name: 'Nuggets',
      price: 15,
      image: 'https://img.itdg.com.br/tdg/images/recipes/000/162/798/323819/323819_original.jpg?mode=crop&width=710&height=400',
    },
  ];

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

  public getPopularProducts() {
    return this.products.filter(product => {
      return product.price <= 20;
    });
  }
}