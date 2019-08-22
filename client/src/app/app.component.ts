import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  constructor(public userService: UserService) {

  }
  ngOnInit() {
    this.login();
  }

  login() {
    if (this.userService.isLoggedIn()) {
      this.loggedIn = true;
    } else {
      this.userService.anonymousSignIn().subscribe((success: boolean) => {
          this.loggedIn = success;
      });
    }
  }
}
