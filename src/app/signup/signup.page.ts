import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public signup() {
    console.log('Fazendo cadastro...');
    console.log(' > Nome:', this.name);
    console.log(' > E-mail:', this.email);
    console.log(' > Senha:', this.password);
    console.log(' > Confirmar senha:', this.confirmPassword);

    this.router.navigate(['/main']);
  }
}
