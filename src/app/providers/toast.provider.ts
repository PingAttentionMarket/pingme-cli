import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastProvider {
  
  constructor(private toastController: ToastController) {
    // Do nothing.
  }
  
  shortToast(message: string) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    
    toast.present();
  }
  
}