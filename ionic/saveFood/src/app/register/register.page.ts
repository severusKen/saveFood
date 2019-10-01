import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = new User();
  
  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }
}
