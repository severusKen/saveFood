import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, ModalController } from '@ionic/angular';
import { RegcompletePage } from '../regcomplete/regcomplete.page';

@Injectable({
  providedIn: 'root'
})

export class User {
  email: string;
  password: string;
}

export class UserService {
  userList: any;
  constructor(
    private storage: Storage,
    private afs: AngularFirestore,
    public router: Router,
    public fAuth: AngularFireAuth,
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    this.userList = this.afs.collection('users');
  }

  /// Log in
  public async login(email: string, password: string) {
    try {
      const signin = await this.fAuth.auth.signInWithEmailAndPassword(email, password);
      if (signin) {
        const uid = signin.user.uid;
        this.saveCurrentUserUID(uid);
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

  //// Registration
  public async register(email: string, password: string) {
    try {
      const registration = await this.fAuth.auth.createUserWithEmailAndPassword(email, password);
      if (registration) {
        this.notifyToConfirmEmail();
        this.addUserInfoToFireStore(registration.user);
      }
    }
    catch (err) {
      console.error(err);
      this.showRegError(err.message);
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

  addUserInfoToFireStore(_user: any) {
    const newUserData = {
      uid: _user.uid,
      displayName: _user.displayName,
      email: _user.email,
      phoneNumber: _user.phoneNumber,
      photoUrl: _user.phoneNumber
    }
    this.userList.add(newUserData);
  }

  public logout() {
    this.fAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
