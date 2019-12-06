import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string = 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws';
  google_map_api_key: string = 'AIzaSyAiF_e-EHwkxNXuJEMzjA7q6FpzwtbolHU';
  api_key: string = 'JJ67-EU82-AU99-GY62';
  country: string = 'CAN';
  constructor(public platform: Platform, public router: Router) { }

  public getAddresses(keyword: string): Promise<any> {
    const _url = `${this.url}?Key=${this.api_key}&Country=${this.country}&SearchTerm=${keyword}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true&MaxSuggestions=7&MaxResults=100`;
    return fetch(_url);
  }

  openInGoogleMap(address: string) {
    const encoded_address = this.encodeAddress(address);
    const _url = `https://www.google.com/maps/embed/v1/place?key=${this.google_map_api_key}&q=${encoded_address}`;
    console.log(_url)
    const url = `https://www.google.com/maps/search/?api=1&query=${encoded_address}`;
    this.openMapPage(_url);
  }

  encodeAddress(origin_address: string): string {
    return origin_address.split(' ').join('+');
  }

  async openMapPage(url: string) {
    this.router.navigate(['/map'], { queryParams: { link: url } });
  }
}
