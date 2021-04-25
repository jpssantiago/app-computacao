import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public email : string;
  public password : string;

  constructor() { }

  ngOnInit() {
  }

  public signin() {
    console.log('Fazendo login...');
    console.log(' > E-mail:', this.email);
    console.log(' > Senha:', this.password);
  }
}
