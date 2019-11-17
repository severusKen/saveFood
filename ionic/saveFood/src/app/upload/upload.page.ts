import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  newFood: any = {
    location: '',
    name: '',
    description: ''
  }
  constructor(public modalCtrl: ModalController, 
              public imageService: ImageService,
              public userService: UserService) { }
  ngOnInit() {
    this.newFood = {
      location: '',
      name: '',
      description: ''
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  donateFood() {
    this.imageService.uploadFoodImage(this.newFood);
  }
}
