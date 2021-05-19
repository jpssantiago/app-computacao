import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public name: string;
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(
    private router: Router, 
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFirestore,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  public async signup() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.toastController.create({
        message: 'Preencha todos os campos para continuar.',
        duration: 2000,
      }).then(toast => toast.present());
      return; // Preencha todos os campos.
    }

    if (this.password !== this.confirmPassword) {
      this.toastController.create({
        message: 'As senhas informadas não coincidem.',
        duration: 2000,
      }).then(toast => toast.present());
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
      const { code } = err;
      let message: string;

      if (code === 'auth/email-already-in-use') {
        message = 'O e-mail informado já está em uso.';
      } else if (code === 'auth/weak-password') {
        message = 'A sua senha precisa ter pelo menos 6 caracteres.';
      } else {
        message = 'Ocorreu um erro inesperado, tente novamente.';
        console.error(err);
      }
      
      this.toastController.create({
        message,
        duration: 2000,
      }).then(toast => toast.present());
    }
  }
}