import { Component, OnInit } from '@angular/core';
import { UploadPage } from '../upload/upload.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {
  
  constructor(
    public modalController: ModalController,
    public router: Router,
    public foodService: FoodService) {
  }

  ngOnInit() {
  }

  async openFoodDetail(food: any) {
    this.router.navigate(['/food-detail'], { queryParams: food });
  }

  async openUploadPage() {
    const modal = await this.modalController.create({
      component: UploadPage,
      backdropDismiss: false
    });
    return await modal.present();
  }

  getItems(event: any) {
    this.foodService.resetFoodList();
    const keyword = event.target.value;
    if (keyword && keyword.trim() != '') {
      this.foodService.getItemsBasedOnSearchText(keyword);
    };
  }
}
