import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  @Input() data: any;
  isPending: boolean;
  food: any = {};
  constructor(public modalCtrl: ModalController,
              private platform: Platform,
              public activatedRoute: ActivatedRoute,
              public foodService: FoodService) {
    let foodSub = activatedRoute.queryParams.subscribe((res) => {
      this.food = res;
      this.isPending = (this.food.status == 'pending') ? true : false;
      console.log(this.food)
    });
    setTimeout(() => { foodSub.unsubscribe(); console.log('Unsubbed fetching food detail'); }, 1000);
  }

  async ngOnInit() {
    await this.platform.ready();
  }

  claimFood() {
    this.foodService.claimFood(this.food.docId).then(() => {
      this.isPending = true;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
