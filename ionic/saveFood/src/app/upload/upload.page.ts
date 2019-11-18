import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  addressList: any = [];
  newFood: any = {
    location: '',
    name: '',
    description: ''
  }
  constructor(public modalCtrl: ModalController, 
              public imageService: ImageService,
              public userService: UserService,
              public locationService: LocationService) { }
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
    this.imageService.uploadFoodImage(this.newFood).then(() => {
      setTimeout(() => {
        this.newFood = {
          location: '',
          name: '',
          description: ''
        }
      }, 100);
    })
  }

  getAddressList() {
    this.locationService.getAddresses(this.newFood.location).then(res => res.json()).then(data => {
      console.log(data);
      if (!data.Items.length) {
        console.log('No addresss found');
        return;
      }
      this.addressList = data.Items;
    });
  }

  selectAddress(address: any) {
    this.newFood.location = address.Text;
    this.addressList = [];
  }

}
