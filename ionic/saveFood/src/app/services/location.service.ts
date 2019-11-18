import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string = 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws';
  api_key: string = 'UX24-TX29-NB22-TN37';
  country: string = 'CAN';
  constructor() { }

  public getAddresses(keyword: string):Promise<any> {
    const _url = `${this.url}?Key=${this.api_key}&Country=${this.country}&SearchTerm=${keyword}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true&MaxSuggestions=7&MaxResults=100`;
    return fetch(_url);
  }

}
