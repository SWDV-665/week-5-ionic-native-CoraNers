import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  editItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Editing item - " + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  removeItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Removing item - " + index + " ...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  shareItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Sharing item - " + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully");
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing ", error);
    });
  }

  addItem() {
    console.log("Adding item");
    this.inputDialogService.showPrompt();
  }

}
