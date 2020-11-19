import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public dataService: GroceriesServiceProvider, public alertCtrl: AlertController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    let alert = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit item...' : 'Please enter item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item? item.quantity : null,
          type: "number"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Save',
          handler: item => {
            console.log('Save clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
