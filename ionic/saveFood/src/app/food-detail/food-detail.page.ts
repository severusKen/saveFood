import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { LocationService } from '../services/location.service';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  @Input() data: any;
  isPending: boolean = false;
  food: any = {};
  constructor(public modalCtrl: ModalController,
              public activatedRoute: ActivatedRoute,
              public foodService: FoodService,
              public locationService: LocationService) {
    let foodSub = activatedRoute.queryParams.subscribe((res) => {
      this.food = res;
      if (res.status == 'pending') this.isPending = true;
    });
    setTimeout(() => { foodSub.unsubscribe(); }, 1000);
  }

  ngOnInit() {
  }

  claimFood() {
    this.foodService.claimFood(this.food.docId).then(() => {
      this.isPending = true;
    })
  }

  cancelClaim() {
    this.foodService.cancelFoodClaim(this.food.docId).then(() => {
      this.isPending = false;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
