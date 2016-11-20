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
  private model = {'username': '', 'password': ''};
  private currentUserName;

  constructor(private loginService: LoginService, formBuilder: FormBuilder) {
    this.currentUserName = localStorage.getItem("currentUserName");
    this.complexForm = formBuilder.group({
      'userName': [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  onSubmit(value: any) {
    console.log("Value: " + value);
    console.log("UserName: " + value.userName);
    console.log("Password: " + value.password);
    // this.loginService.sendCredential(this.model.username, this.model.password).subscribe(
    //   data => {
    //     let responseBody = JSON.parse(JSON.stringify(data))._body;
    //     let response = JSON.parse(responseBody);
    //     let access_token = response.access_token;
    //     localStorage.setItem("token", access_token);
    //     this.loginService.sendToken(localStorage.getItem("token")).subscribe(
    //       data => {
    //         this.currentUserName = this.model.username;
    //         localStorage.setItem("currentUserName", this.model.username);
    //         this.model.username = '';
    //         this.model.password = '';
    //       },
    //       error => console.log(error)
    //     )
    //   },
    //   error => console.log(error)
    // );
  }
}
