import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export class User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user:User = new User();
  constructor(public fAuth: AngularFireAuth, public toastController: ToastController, public router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      const signin = await this.fAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (signin) {
        console.info('Successfully registered');
        this.router.navigate(['/home']);
      }
    }
    catch (err) { 
      console.error(err);
      this.showSignInError(err.message) ;
    }
  }

  async showSignInError(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  goToRegisterPage() {
    this.user.password = '';
    this.user.email = '';
    this.router.navigate(['/register']);
  }
}
