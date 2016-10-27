import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavBar {
  myLocalStorage;

  constructor(private loginService: LoginService) {
    this.myLocalStorage = localStorage;
  }

  onClick() {
    if (this.loginService.checkLogin()) {
      this.loginService.logout();
    }
  }
}
