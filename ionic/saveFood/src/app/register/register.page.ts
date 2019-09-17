import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { RegcompletePage } from '../regcomplete/regcomplete.page';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = new User();

  constructor(public fAuth: AngularFireAuth,
    public router: Router,
    public modalController: ModalController,
    public toastController: ToastController
  ) {

  }

  ngOnInit() {
  }

  async register() {
    try {
      const registration = await this.fAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      if (registration) {
        console.info('Successfully registered');
        this.notifyToConfirmEmail();
      }
    }
    catch (err) { 
      console.error(err);
      this.showRegError(err.message) ;
    }
  }

  async notifyToConfirmEmail() {
    const modal = await this.modalController.create({
      component: RegcompletePage,
      backdropDismiss: false
    });
    modal.onWillDismiss().then(() => {
      this.router.navigate(['/login']);
    });
    return await modal.present();
  }

  async showRegError(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
