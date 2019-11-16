import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  /**
   * @description Get image that is uploaded from <input#file>
   * @param event 
   */
  getImageSrc(event: any): File {
    console.log(event.srcElement.files);
    const image = event.srcElement.files[0];
    if (!image.type.match(/^image\//)) return;
    return image;
    //this.currentImage = URL.createObjectURL(image);
  }

  public addImageToPage(event: any) {
    console.log(event)
    const image = this.getImageSrc(event);
    if (!image) return;
    const imageData = URL.createObjectURL(image);
    console.log(imageData);
    if (event.currentTarget.id == 'foodUploader') {
      this.createNewFoodImage(imageData);
    }
    if (event.currentTarget.id == 'avatarUploader') {
      this.createNewAvatarImage(imageData)
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
  
}
