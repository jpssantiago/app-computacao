import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
    private userService: UserService,
    private firebaseAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  public async signup() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      return; // Preencha todos os campos.
    }

    if (this.password !== this.confirmPassword) {
      return; // Senhas não coincidem.
    }

    try {
      const response = await this.firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
      if (response) {
        this.userService.createUser(this.name, this.email, this.password);
        this.router.navigate(['/main/home']);
      }
    } catch(err) {
      console.error(err);
    }
  }
}