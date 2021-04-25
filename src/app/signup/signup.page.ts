import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public name : string;
  public email : string;
  public password : string;
  public confirmPassword : string;

  constructor() { }

  ngOnInit() {
  }

  public signup() {
    console.log('Fazendo cadastro...');
    console.log(' > Nome:', this.name);
    console.log(' > E-mail:', this.email);
    console.log(' > Senha:', this.password);
    console.log(' > Confirmar senha:', this.confirmPassword);
  }
}
