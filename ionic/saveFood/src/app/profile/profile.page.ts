import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public fAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.fAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
