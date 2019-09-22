import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {
  foodList: Observable<any[]>;
  constructor(private af: AngularFirestore) {
    this.foodList = this.af.collection('foodlist').valueChanges();
  }

  ngOnInit() {
    

  }

  openFoodDetail() {
    
  }
}
