import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/observable';

@Injectable()
export class RegisterService {
  constructor(private http: Http) {}

  sendUser(user:User) {
    let url = "http://localhost:8080/user/register";
    let headers1 = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, JSON.stringify(user), {headers: headers1});
  }
}
