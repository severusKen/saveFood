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

  /**
   * @description Get food list collection from firebase
   */
  resetFoodList() {
    this.foodList = this.af.collection('foodlist').valueChanges();
  }

  /**
   * @description Filter the food list based on given tags/keywords
   * @param keyword ex: "Chicken, Pork"
   */
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
