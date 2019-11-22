import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public foodList: any;
  constructor(private af: AngularFirestore, public userService: UserService) {
    this.resetFoodList();
  }

  /**
   * @description Get food list collection from firebase
   */
  resetFoodList() {
    this.foodList = this.af.collection('foodlist').valueChanges().pipe(
      map((foods: any) => foods.filter(
        (food: any) => (food['receiverUid'] === '' || !food['receiverUid']) // Only show food that none has claimed yet
      )),
    )
  }

  /**
   * @description Filter the food list based on given tags/keywords
   * @param keyword ex: "Chicken, Pork"
   */
  public getItemsBasedOnSearchText(keyword: string) {
    this.foodList = this.foodList.pipe(
      map((foods: any) => foods.filter(
        (food: any) => food['foodType'].toLowerCase().indexOf(keyword.toLowerCase()) > -1
      )),
    )
  }

  uploadFood(data) {
    const food_database = this.af.collection('foodlist');
    return food_database.add(data);
  }

  updateFoodInformation(id, data) {
    const foodDocument = this.af.doc<any>(`foodlist/${id}`);
    foodDocument.update(data).then(() => {

    })
  }

  claimFood(food) {
    this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      this.getFoodDocumentId(food.id).subscribe(res => {
        console.log(res)
        this.updateFoodInformation(res[0]['docId'], { receiverUid: uid });
      })
    })
  }

  getFoodDocumentId(foodId) {
    return this.af.collection('foodlist', ref => ref.where('id', '==', foodId).limit(1))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const docId = a.payload.doc.id;
            return { docId, ...data };
          });
        })
      );
  }

  getFoodInStash() {
    this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      return this.af.collection('foodlist', ref => ref.where('receiverUid', '==', uid).limit(1))
        .snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as any;
              const docId = a.payload.doc.id;
              return { docId, ...data };
            });
          })
        );
    })
  }
}
