import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import User from 'src/models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public email : string;
  public password : string;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public async signin() {
    try {
      const response = await this.firebaseAuth.signInWithEmailAndPassword(this.email, this.password);
      if (response) {
        const id = response.user.uid;
        this.firebaseStorage.collection('users').doc(id).valueChanges().subscribe(userInfo => {
          const name = userInfo['name'];
          const email = userInfo['email'];

          this.userService.setUser(name, email);
          this.router.navigate(['/main']);
        })
      }
    } catch(err) {
      console.log(err);
    }
  }
}