import {Component} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {LoginService} from "../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class Login {
  complexForm: FormGroup;
  private currentUserName;

  constructor(private loginService: LoginService,
              private teamService: TeamService,
              formBuilder: FormBuilder) {
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
            this.currentUserName = userName;
            localStorage.setItem("currentUserName", userName);
          },
          error => console.log(error)
        );
        this.teamService.getTeams().subscribe(
          data => {
            let teamResponse = JSON.parse(JSON.stringify(data))._body;
            let teamJson = JSON.parse(teamResponse);
            let team = new Team(teamJson);
            console.log(team);
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }
}
