import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  private loading: any;

  constructor(
    private router: Router, 
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFirestore,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  public async signup() {
    await this.presentLoading();
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.toastController.create({
        message: 'Preencha todos os campos para continuar.',
        duration: 2000,
      }).then(toast => toast.present()); 
      this.loading.dismiss();
      return; // Preencha todos os campos.
    }

    if (this.password !== this.confirmPassword) {
      this.toastController.create({
        message: 'As senhas informadas não coincidem.',
        duration: 2000,
      }).then(toast => toast.present());
      this.loading.dismiss();
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
        this.userService.setUser(id, this.name, this.email);
        this.router.navigate(['/main/home']);
      }
      
      this.loading.dismiss();
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
      this.loading.dismiss();
    }
    finally {
      this.loading.dismiss();
  }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }
}