import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public foodList: Observable<any[]>;
  constructor(private af: AngularFirestore) {
    this.foodList = this.af.collection('foodlist').valueChanges();
  }

  getYourDonatedFood() {

  }

  getYourReceivingFood() {
    
  }
}
