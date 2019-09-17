import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isSlideShowing: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public router: Router
  ) {
    this.initializeApp();
    this.storage.get('showSlide').then((val) => {
      if (val === undefined) {
        console.info('App is running for the first time after installation => Show intro slide');
        this.storage.set('showSlide', false);
        // Allow slide to be shown
        this.isSlideShowing = true;
      }
      else {
        console.info('This is not the first time load, show slide would not be loaded');
        // Navigate for home page
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
