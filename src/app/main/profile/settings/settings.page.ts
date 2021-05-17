import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public name : string;

  constructor(
    private navController : NavController, 
    private toastController : ToastController,
    private userService: UserService
  ) { 
    this.name = userService.user.name;
  }

  ngOnInit() {
  }

  public editProfile = async () => {
    if (!this.name) {
      const toast = await this.toastController.create({
        message: 'Preencha o campo de nome para editar.',
        duration: 2000,
      });

      toast.present();
      return;
    }

    this.userService.editUser(this.name);

    this.navController.pop();

    const toast = await this.toastController.create({
      message: 'O seu perfil foi editado.',
      duration: 2000,
    });
    toast.present();
  }
}
