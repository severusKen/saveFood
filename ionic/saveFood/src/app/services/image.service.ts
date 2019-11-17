import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  avatarImage: any = null;
  foodImage: any = null;
  constructor(private storage: AngularFireStorage, public userService: UserService) { }

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

  public addImageToPage(event: any) {
    console.log(event)
    const image = this.getImageSrc(event);
    if (!image) return;
    const imageData = URL.createObjectURL(image);
    console.log(imageData);
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

  cropImage() {

  }

  uploadAvatar(id) {
    if (!id) return;
    const filePath = `avatars/${id}`;
    const uploadProcess = this.storage.upload(filePath, this.avatarImage).then(() => {
      console.log('uploaded finished')
      this.avatarImage = null;
      const downloadProcess = this.getAvatar(filePath).subscribe(url => {
        this.userService.updateUserAvatar(id, url);
      })
      setTimeout(() => { downloadProcess.unsubscribe()}, 1000);
    });
  }

  getAvatar(avatarPath: string) {
    const ref = this.storage.ref(avatarPath);
    return ref.getDownloadURL();
  }

  uploadFoodImage() {
    this.userService.getCurrentUserUID().then(uid => {
      if (uid) {
        const filePath = `./foods/${uid}`;
        const uploadProcess = this.storage.upload(filePath, this.foodImage).then(() => this.foodImage = null);
      }
    })
  }
}
