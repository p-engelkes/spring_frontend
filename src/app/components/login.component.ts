import {Component} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class Login {
  private model = {'username': '', 'password': ''};
  private currentUserName;

  constructor(private loginService: LoginService) {
    this.currentUserName = localStorage.getItem("currentUserName");
  }

  onSubmit() {
    this.loginService.sendCredential(this.model.username, this.model.password).subscribe(
      data => {
        let responseBody = JSON.parse(JSON.stringify(data))._body;
        let response = JSON.parse(responseBody);
        let access_token = response.access_token;
        localStorage.setItem("token", access_token);
        this.loginService.sendToken(localStorage.getItem("token")).subscribe(
          data => {
            this.currentUserName = this.model.username;
            localStorage.setItem("currentUserName", this.model.username);
            this.model.username = '';
            this.model.password = '';
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
    // this.loginService.sendCredential(this.model.username, this.model.password).subscribe(
    //   data => {
    //     console.log(data);
        // localStorage.setItem("token", JSON.parse(JSON.stringify(data))._body);
        // this.loginService.sendToken(localStorage.getItem("token")).subscribe(
        //   data => {
        //     this.currentUserName = this.model.username;
        //     localStorage.setItem("currentUserName", this.model.username);
        //     this.model.username = '';
        //     this.model.password = '';
        //   },
        //   error => console.log(error)
        // )
      // },
      // error => console.log(error)
    // )
  }
}
