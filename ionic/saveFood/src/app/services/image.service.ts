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

  public addFoodImageToPage(event: any) {
    console.log(event)
    const foodImage = this.getImageSrc(event);
    if (!foodImage) return;
    const foodImageData = URL.createObjectURL(foodImage);
    console.log(foodImageData);
    if (event.currentTarget.id == 'foodUploader') {
      this.createNewFoodImage(foodImageData);
    }
    if (event.currentTarget.id == 'avatarUploader') {

    }
  }

  createNewFoodImage(src: string) {
    const foodImageHolder = <HTMLImageElement>document.getElementById('foodImage');
    foodImageHolder.src = src;
    foodImageHolder.style.display = '';
  }

  createNewAvatarImage() {
    
  }

  
}
