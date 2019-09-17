import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-regcomplete',
  templateUrl: './regcomplete.page.html',
  styleUrls: ['./regcomplete.page.scss'],
})
export class RegcompletePage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
