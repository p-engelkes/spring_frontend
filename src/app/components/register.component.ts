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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
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

  onSubmit() {
    console.log(this.registerForm.hasError('mismatchedPasswords'));
    // this.registerService.sendUser(this.newUser)
    //   .subscribe(
    //     data => {
    //       this.registered = true;
    //       this.newUser = new User;
    //     },
    //     error => console.log(error)
    //   );
  }
}
