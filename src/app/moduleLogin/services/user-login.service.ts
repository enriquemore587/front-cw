import { Injectable } from '@angular/core';
import { GLOBAL } from '../../services/global';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private url : string = environment.url;
  private httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' } );

  public auth: string;

  constructor(
    private _http: HttpClient
  ) { }

  login(user_to_login: User) : any{

    let params = JSON.stringify(user_to_login);

    return this._http.post<any>(this.url+'session/login-bank', params, {headers: this.httpHeaders});

  }

  getAuth() {
    let auth = localStorage.getItem('auth');
    
    if (auth != "undefined") {
      this.auth = auth;
    }else{
      this.auth = null;
    }
    return this.auth;
  }

}
