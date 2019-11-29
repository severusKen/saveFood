import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public isDonor: boolean;
  public foodDetailStatus: string;
  public foodList: any;
  public donatedFood: any;
  public receivingFood: any;
  public receivedFood: any;

  constructor(private af: AngularFirestore, 
              public userService: UserService,
              public toastController: ToastController) {
    this.resetFoodList();
    this.getDonatedFood();
    this.getReceivingFood();
  }

  /**
   * @description Get food list collection from firebase
   * @note This function is used like a way to "refresh" the list
   */
  resetFoodList() {
    this.foodList = 
    this.af.collection('foodlist', ref => ref.where('receiverUid', '==', '')).snapshotChanges()
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

  /**
   * @description Add new record to food database
   * @param data new food data in object format
   */
  uploadFood(data: any) {
    const food_database = this.af.collection('foodlist');
    return food_database.add(data);
  }

  /**
   * @description Modify a record in food database
   * @param id ID of food record
   * @param data New data in Object format { key: newValue }
   */
  updateFoodInformation(id: string, data: any) {
    const foodDocument = this.af.doc<any>(`foodlist/${id}`);
    foodDocument.update(data).then(() => {
      if (data.receiverUid !== '') this.showMsg('Claimed. Check your stash.');
      if (data.receiverUid == '') this.showMsg('Claim cancelled');
    })
  }

  /**
   * @description Modify the selected food's receiverUid to current user's UID, if he decides to claim the food
   * @param food Food record => Used to extract food Id for modification
   */
  claimFood(docId: string) {
    return this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      this.updateFoodInformation(docId, { receiverUid: uid, status: 'pending' });
    })
  }

  /**
   * @description Show the food that user is about to claim
   * @note Only one food can be claim at a time
   */
  getReceivingFood() {
    this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      this.receivingFood = 
        this.af.collection('foodlist', ref => ref.where('receiverUid', '==', uid)).valueChanges();
    })
  }

  /**
   * @description Show the list of user's donated food
   */
  getDonatedFood() {
    this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      this.donatedFood = this.af.collection('foodlist', ref => ref.where('donorUid', '==', uid)).valueChanges();
    });
  }

  /**
   * @description Show a popup that displays the given message
   * @param msg Message
   */
  async showMsg(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }
  
  cancelFoodClaim(docId: string) {
    return this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      this.updateFoodInformation(docId, { receiverUid: '', status: 'available' });
    })
  }
}
