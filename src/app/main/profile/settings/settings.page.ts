import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public name : string = 'Nome de teste';
  public email : string = 'E-mail de teste';
  public password : string = 'senha';
  public confirmPassword : string = 'senha';

  constructor(private navController : NavController, private toastController : ToastController) { }

  ngOnInit() {
  }

  public editProfile = async () => {
    console.log('Editando perfil...');
    console.log(' > Nome:', this.name);
    console.log(' > E-mail:', this.email);
    console.log(' > Senha:', this.password);
    console.log(' > Confirmar senha:', this.confirmPassword);

    this.navController.pop();

    const toast = await this.toastController.create({
      message: 'O seu perfil foi editado.',
      duration: 2000,
    });
    toast.present();
  }
}
