import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  public zipCode : string = '12.345-678';
  public street : string = 'Av. Brasil';
  public number : string = '102';
  public otherInfo : string;

  constructor(private navController : NavController, private toastController : ToastController) { }

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
    
    console.log('Fazendo cadastro...');
    console.log(' > CEP:', this.zipCode);
    console.log(' > Rua:', this.street);
    console.log(' > Número:', this.number);
    console.log(' > Complemento:', this.otherInfo);

    const toast = await this.toastController.create({
      message: 'O seu endereço atualizado com sucesso.',
      duration: 3000,
    });
    toast.present();

    this.navController.pop();
  }
}
