import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  public zipCode : string;
  public street : string;
  public number : number;
  public otherInfo : string;

  constructor(
    private navController : NavController, 
    private toastController : ToastController,
    private userService: UserService,
  ) { 
    const address = this.userService.user.address;
    this.zipCode = address.zip;
    this.street = address.street;
    this.number = address.number;
    this.otherInfo = address.otherInfo;
  }

  ngOnInit() {
  }

  public editAddress = async () => {
    if (!this.zipCode || !this.street || !this.number) {
      const toast = await this.toastController.create({
        message: 'Preencha os campos para editar o endereço.',
        duration: 3000,
      });

      toast.present();
      return;
    }

    this.userService.editAddress(this.zipCode, this.street, this.number, this.otherInfo);

    const toast = await this.toastController.create({
      message: 'O seu endereço foi atualizado com sucesso.',
      duration: 3000,
    });
    toast.present();

    this.navController.pop();
  }
}