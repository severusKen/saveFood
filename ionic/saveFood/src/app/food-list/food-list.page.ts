import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {
  foods: Array<any>;
  constructor() {
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

  ngOnInit() {
  }

}
