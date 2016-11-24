import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  token: string;

  constructor(private http: Http) {
  }

  sendCredential(userName: string, password: string) {
    let tokenUrl = "http://localhost:8080/oauth/token?grant_type=password&client_id=live-test&username=" + userName + "&password=" + password;
    let headers = new Headers({'Authorization': 'Basic bGl2ZS10ZXN0OmFkbWlucGFzcw=='});
    return this.http.get(tokenUrl, {headers: headers});
  }

  sendToken(token) {
    let tokenUrl = "http://localhost:8080/rest/user/users";
    let getHeaders = new Headers({'Authorization': 'Bearer' + token});
    return this.http.get(tokenUrl, {headers: getHeaders})
  }

  logout() {
    localStorage.setItem("token", "");
    localStorage.setItem("currentUserName", '');
  }

  checkLogin() {
    if (localStorage.getItem("currentUserName") != null &&
      localStorage.getItem("currentUserName") != '' &&
      localStorage.getItem("token") != null &&
      localStorage.getItem("token") != ''
    ) {
      return true;
    } else {
      return false;
    }
  }
}
