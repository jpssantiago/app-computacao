import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public email : string;
  public password : string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public signin() {
    console.log('Fazendo login...');
    console.log(' > E-mail:', this.email);
    console.log(' > Senha:', this.password);

    this.router.navigate(['/main']);
  }
}
