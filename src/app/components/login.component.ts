import {Component} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {LoginService} from "../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class Login {
  complexForm: FormGroup;
  private currentUserName;

  constructor(private loginService: LoginService, formBuilder: FormBuilder) {
    this.currentUserName = localStorage.getItem("currentUserName");
    this.complexForm = formBuilder.group({
      'userName': [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  getUserNameError(): string {
    return "A username is required."
  }

  getPasswordError(): string {
    return "A password is required";
  }

  onSubmit(value: any) {
    let userName = value.userName;
    let password = value.password;
    this.loginService.sendCredential(userName, password).subscribe(
      data => {
        let responseBody = JSON.parse(JSON.stringify(data))._body;
        let response = JSON.parse(responseBody);
        let access_token = response.access_token;
        localStorage.setItem("token", access_token);
        this.loginService.sendToken(localStorage.getItem("token")).subscribe(
          data => {
            this.currentUserName = userName
            localStorage.setItem("currentUserName", userName);
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }
}
