import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  isSlideShowing: boolean = false;
  constructor(private storage: Storage, public router: Router) {
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

  ngOnInit() {
  }

}
