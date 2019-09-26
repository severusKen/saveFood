import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, Environment } from '@ionic-native/google-maps/ngx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  @Input() data: any;
  map: GoogleMap;
  food: any = {};
  constructor(public modalCtrl: ModalController, private platform: Platform, public activatedRoute: ActivatedRoute) {
    let foodSub = activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.food = res;
    });
    setTimeout(() => { foodSub.unsubscribe(); console.log('Unsubbed fetching food detail'); }, 3000);
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    //console.log(this.data)
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCkmCvEfn2uT1tDOGBsJAsQG0K1HlKcZ7I',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCkmCvEfn2uT1tDOGBsJAsQG0K1HlKcZ7I'
    })
    this.map = GoogleMaps.create('map_canvas');

  }
}
