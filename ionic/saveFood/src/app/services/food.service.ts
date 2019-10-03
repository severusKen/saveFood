import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public foodList: any;
  constructor(private af: AngularFirestore) {
    this.resetFoodList();
  }

  resetFoodList() {
    this.foodList = this.af.collection('foodlist').valueChanges();
  }

  public getItemsBasedOnSearchText(keyword: string) {
    this.foodList = this.foodList.pipe(
      map((foods:any) => foods.filter(
        (food:any) => food['foodType'].toLowerCase().indexOf(keyword.toLowerCase()) > -1
      )),
    )
  }

  getYourDonatedFood() {

  }

  getYourReceivingFood() {
    
  }
}
