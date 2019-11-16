import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  @Input() userID: string;
  newInfo: any = {
    displayName: '',
    phoneNumber: ''
  }
  constructor(public modalCtrl: ModalController, public userService: UserService, public imageService: ImageService) { }

  ngOnInit() {
  }

  updateNewInformation() {
    this.userService.updateUserInfo(this.userID, this.newInfo);
  }

  validateNewEmail() {

  }

  validateNewPhoneNumber() {

  }

  validateNewDisplayName() {

  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
