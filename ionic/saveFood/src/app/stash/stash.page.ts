import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.page.html',
  styleUrls: ['./stash.page.scss'],
})
export class StashPage implements OnInit {

  constructor(public modalController: ModalController,
              public router: Router,
              public foodService: FoodService) { }

  ngOnInit() {
  }

  async openFoodDetail(food: any) {
    this.router.navigate(['/food-detail'], { queryParams: food });
  }

}
