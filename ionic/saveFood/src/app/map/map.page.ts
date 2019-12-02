import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map_url: any = '';
  constructor(private location: Location, public activatedRoute: ActivatedRoute, public sanitizeService: DomSanitizer) {
    let foodSub = activatedRoute.queryParams.subscribe((res) => {
      this.map_url = res['link']; // clean the link
    });
    setTimeout(() => { foodSub.unsubscribe(); }, 100);
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  getSanitizedLink() {
    return this.sanitizeService.bypassSecurityTrustResourceUrl(this.map_url);
  }
}
