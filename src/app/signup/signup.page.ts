import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Address from 'src/models/address';
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
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFirestore,
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
        const id = response.user.uid;
        this.firebaseStorage.doc(`users/${id}`).set({
          id,
          email: this.email,
          name: this.name,
          orders: [],
        });
        this.userService.setUser(this.name, this.email);
        this.router.navigate(['/main/home']);
      }
    } catch(err) {
      console.error(err);
    }
  }
}

/*
.add({
          id: id,
          email: this.email,
          name: this.name,
          orders: [],
        });
*/