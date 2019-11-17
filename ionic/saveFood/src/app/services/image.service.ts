import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './user.service';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  avatarImage: any = null;
  public foodImage: any = null;
  constructor(private storage: AngularFireStorage, public userService: UserService, public foodService: FoodService) { }

  /**
   * @description Get image that is uploaded from <input#file>
   * @param event 
   */
  getImageSrc(event: any): File {
    console.log(event.srcElement.files);
    const image = event.srcElement.files[0];
    if (!image.type.match(/^image\//)) return;
    return image;
  }

  public addImageToPage(event: any): void {
    const image = this.getImageSrc(event);
    if (!image) return;
    const imageData = URL.createObjectURL(image);
    if (event.currentTarget.id == 'foodUploader') {
      this.createNewFoodImage(imageData);
      this.foodImage = image;
    }
    if (event.currentTarget.id == 'avatarUploader') {
      this.createNewAvatarImage(imageData);
      this.avatarImage = image;
    }
  }

  createNewFoodImage(src: string) {
    const foodImageHolder = <HTMLImageElement>document.getElementById('foodImage');
    foodImageHolder.src = src;
    foodImageHolder.style.display = '';
  }

  createNewAvatarImage(src: string) {
    const foodImageHolder = <HTMLImageElement>document.getElementById('avatarImage');
    foodImageHolder.src = src;
    foodImageHolder.style.display = '';
  }

  uploadAvatar(id) {
    if (!id) return;
    const filePath = `avatars/${id}`;
    const uploadProcess = this.storage.upload(filePath, this.avatarImage).then(() => {
      console.log('uploaded finished')
      this.avatarImage = null;
      const downloadProcess = this.getImagePath(filePath).subscribe(url => {
        this.userService.updateUserAvatar(id, url);
      })
      setTimeout(() => { downloadProcess.unsubscribe() }, 1000);
    });
  }

  getImagePath(imgPath: string) {
    const ref = this.storage.ref(imgPath);
    return ref.getDownloadURL();
  }

  uploadFoodImage(newFood) {
    if (!newFood.location) {
      this.userService.showMsg('Location is required.');
      return;
    }
    if (!newFood.name) {
      this.userService.showMsg('Please give your donation a title');
      return;
    }
    if (!this.foodImage) {
      this.userService.showMsg('A picture of food is required.')
      return;
    }
    this.userService.getCurrentUserUID().then(uid => {
      if (!uid) return;
      const fileName = this.generateRandomFileName();
      const filePath = `foods/${uid}/${fileName}`;
      let data = {
        location: newFood.location,
        name: newFood.name,
        description: newFood.description,
        donorUid: uid,
        id: fileName,
        receiverUid: '',
        thumbnail: ''
      }
      const uploadProcess = this.storage.upload(filePath, this.foodImage).then(() => {
        this.foodImage = null;
        const downloadProcess = this.getImagePath(filePath).subscribe(url => {
          data.thumbnail = url;
          this.foodService.uploadFood(data);
        })
        setTimeout(() => { downloadProcess.unsubscribe() }, 1000);
      });
    })
  }

  generateRandomFileName(): string {
    const length = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let str = '';
    for (var i = 0; i < length; i++) {
      str += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return str;
  }
}
