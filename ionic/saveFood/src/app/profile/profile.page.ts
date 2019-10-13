import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { UpdateProfilePage } from '../update-profile/update-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(public userService: UserService, public modalController: ModalController) {
    this.userService.getCurrentUserUID().then(uid => {
      if (uid) {
        console.log('Upadting current user info');
        this.userService.getUserInfoBasedOnUID(uid);
      }
    })
  }

  ngOnInit() {
  }

  async openUpdateForm(id: string) {
    const modal = await this.modalController.create({
      component: UpdateProfilePage,
      componentProps: {
        userID: id
      },
      backdropDismiss: false
    });
    return await modal.present();
  }
}
