import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public signup() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      return; // Preencha todos os campos.
    }

    if (this.password !== this.confirmPassword) {
      return; // Senhas não coincidem.
    }

    this.userService.createUser(this.name, this.email, this.password);
    this.router.navigate(['/main/home']);
  }
}