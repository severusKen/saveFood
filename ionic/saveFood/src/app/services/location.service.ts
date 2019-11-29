import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string = 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws';
  api_key: string = 'UX24-TX29-NB22-TN37';
  country: string = 'CAN';
  constructor(public platform: Platform) { }

  public getAddresses(keyword: string): Promise<any> {
    const _url = `${this.url}?Key=${this.api_key}&Country=${this.country}&SearchTerm=${keyword}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true&MaxSuggestions=7&MaxResults=100`;
    return fetch(_url);
  }

  openInGoogleMap(address: string) {
    const encoded_address = this.encodeAddress(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encoded_address}`;
    console.log(url)
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      // App is running in a browser
      this.openLinkInNewTab(url);
    } else {

    }
  }

  encodeAddress(origin_address: string): string {
    return origin_address.split(' ').join('+');
  }

  openLinkInNewTab(url: string) {
    const newTab = window.open(url, '_blank');
    newTab.focus();
  }

  openLinkInAppBrowser(url: string) {
    
  }
}
