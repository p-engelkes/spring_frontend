import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Team} from "../models/team";

@Injectable()
export class TeamService {
  constructor(private http: Http) {

  }

  getTeams() {
    let url = "http://localhost:8080/rest/team?name=Herren 1. Mannschaft";
    let token = localStorage.getItem('token');
    let headers = new Headers({'Authorization': 'Bearer' + token});
    return this.http.get(url, {headers: headers});
  }
}
