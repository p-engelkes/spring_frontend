import {Component} from '@angular/core';
import {User} from '../models/user';
import {RegisterService} from '../services/register.service';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {matchingPasswords} from "../validators";

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class Register {
  registerForm: FormGroup;
  newUser: User = new User();
  registered: boolean = false;

  constructor(private registerService: RegisterService, formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    }, {validator: matchingPasswords('password', 'passwordConfirmation')})
  }

  getFirstNameError(): string {
    return "First Name is required";
  }

  getLastNameError(): string {
    return "Last Name is required";
  }

  getUserNameError(): string {
    return "User Name is required";
  }

  getPasswordError(): string {
    return "Password is required";
  }

  getPasswordConfirmationError(): string {
    var error = "";
    if (this.registerForm.hasError('mismatchedPasswords')) {
      error += "Passwords do not match";
    } else if (this.registerForm.controls['passwordConfirmation'].hasError('required')) {
      error += "Password confirmation is required";
    }

    return error;
  }

  onSubmit(value: any) {
    let firstName = value.firstName;
    let lastName = value.lastName;
    let userName = value.userName;
    let password = value.password;
    let user = new User().create(firstName, lastName, userName, password);
    this.registerService.sendUser(user)
      .subscribe(
        data => {
          this.registered = true;
          this.newUser = new User;
        },
        error => {
          console.log(error)
          let responseBody = JSON.parse(JSON.stringify(error))._body;
          let response = JSON.parse(responseBody);
          let status = response.status;
          if (status === "BAD_REQUEST") {
            let message = response.message;
            swal({
              title: message,
              type: "error"
            });
          }
        }
      );
  }
}
