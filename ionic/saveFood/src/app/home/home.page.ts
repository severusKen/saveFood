import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodDetailPage } from '../food-detail/food-detail.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

foods: Array<any>;


  
  constructor(public modalController: ModalController, public router: Router) {

    this.foods = [
      {
        name: 'hamburger',
        image: '',
        id: 0,
        icon: "logo-apple"
      },
      {
        name: 'hotdog',
        image: '',
        id: 1,
        icon: "logo-google"
      },
      {
        name: 'taco',
        image: '',
        id: 2
      },
      {
        name: 'salad',
        image: '',
        id: 4
      }
    ]
  }



}
