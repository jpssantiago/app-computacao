import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { OverlayBaseController } from '@ionic/angular/util/overlay';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public email: string;
  public password: string;
  public firebaseSubscription;
  private loading: any;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFirestore,
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  public async signin() {   
    try {
      const response = await this.firebaseAuth.signInWithEmailAndPassword(this.email, this.password);
      if (response) {
        const id = response.user.uid;
        this.firebaseSubscription = this.firebaseStorage.collection('users').doc(id).valueChanges().subscribe(userInfo => {
          const name = userInfo['name'];
          const email = userInfo['email'];

          this.firebaseSubscription.unsubscribe();
          this.userService.setUser(name, email);
          this.router.navigate(['/main']);

          this.email = '';
          this.password = '';
        });
        await this.presentLoading();
      } 
    } catch(err) {
      const { code } = err;
      let message: string;
      
      if (code === 'auth/wrong-password') {
        message = 'E-mail ou senha incorretos.';
      } else if (code === 'auth/user-not-found') {
        message = 'Usuário não existe no banco de dados.';
      } else if (code === 'auth/invalid-email') {
        message = 'Insira um e-mail válido para continuar.';
      } else {
        message = 'Um erro inesperado ocorreu, tente novamente.';
        console.log(err);
      }
      this.toastController.create({
        message,
        duration: 2000,
      }).then(toast => toast.present());
      await this.presentLoading();
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