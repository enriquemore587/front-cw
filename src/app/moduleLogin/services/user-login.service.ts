import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import * as sha1 from 'js-sha1';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public auth: string;
  public name_profile: string;

  constructor(
    private _http: HttpClient
  ) { }

  login(user_to_login: User): any {
    user_to_login.pwd = sha1(user_to_login.pwd);    
    let params = JSON.stringify(user_to_login);

    return this._http.post<any>(this.url + 'session/login-bank', params, { headers: this.httpHeaders });

  }

  getAuth() {
    let auth = localStorage.getItem('auth');

    if (auth != "undefined") {
      this.auth = auth;
    } else {
      this.auth = null;
    }
    return this.auth;
  }

  getName_profile() {
    let name_profile = localStorage.getItem('name_profile');

    if (name_profile != "undefined") {
      this.name_profile = name_profile;
    } else {
      this.name_profile = null;
    }
    return this.name_profile;
  }

}
