import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadPage } from '../upload/upload.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {
  foodList: Observable<any[]>;
  constructor(private af: AngularFirestore, public modalController: ModalController,
    public router: Router) {
    this.foodList = this.af.collection('foodlist').valueChanges();
  }

  ngOnInit() {
    

  }

  async openFoodDetail(food) {
    this.router.navigate(['/food-detail'], { queryParams: food });
  }

  async openUploadPage() {
    const modal = await this.modalController.create({
      component: UploadPage,
      backdropDismiss: false
    });
    return await modal.present();
  }

  getItems(event) {
    
  }
}
