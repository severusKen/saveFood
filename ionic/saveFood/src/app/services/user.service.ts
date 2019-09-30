import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: Storage,
    private af: AngularFirestore,
    public router: Router,
    public fAuth: AngularFireAuth,
    public toastController: ToastController
  ) { }


  public async login(email: string, password: string) {
    try {
      const signin = await this.fAuth.auth.signInWithEmailAndPassword(email, password);
      if (signin) {
        console.log(signin)
        console.info('Successfully logged in');
        //this.user.password = '';
        this.router.navigate(['/home']);
      }
    }
    catch (err) {
      console.error(err);
      this.showMsg(err.message);
    }
  }

  saveCurrentUserUID(uid: string) {
    this.storage.set('currentUID', uid);
  }

  async getCurrentUserUID() {
    return await this.storage.get('currentUID');
  }

  getUserInfoBasedOnUID(uid: string) {

  }

  goToPage(url: string) {
    this.router.navigate([url]);
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  async showMsg(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
