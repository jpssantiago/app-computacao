import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private alertController : AlertController, private router: Router) { }

  ngOnInit() {
  }

  public getMessage = (): string => {
    const hour = new Date().getHours();

    if (hour >= 1 && hour < 12) {
      return 'Bom dia';
    } else if (hour >= 12 && hour < 19) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  public logout = async () => {
    const alert = this.alertController.create({
      message: 'Você deseja mesmo encerrar a sua sessão?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sair',
          handler: () => {
            this.router.navigate(['/welcome']);
          }
        }
      ],
    });

    (await alert).present();
  }
}
