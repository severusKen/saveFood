import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

export class User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = new User();
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  /**
   * @description CLear the email and password after leaving this page
   */
  ngAfterViewInit() {
    console.log('Left Login page');
    this.user = {
      email: '',
      password: ''
    }
  }
}
