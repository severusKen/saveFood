import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.page.html',
  styleUrls: ['./stash.page.scss'],
})
export class StashPage implements OnInit {

  constructor(public foodService: FoodService) { }

  ngOnInit() {
  }

}
