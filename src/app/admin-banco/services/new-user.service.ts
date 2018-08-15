import { Injectable } from '@angular/core';
import { ProfileTypes } from '../models/ProfileTypes';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserToCreate } from '../models/UserToCreate';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public _ProfileTypesList: ProfileTypes[] = [];
  public _UserToCreate: UserToCreate = new UserToCreate();
  constructor(
    private _http: HttpClient,
    private _Router: Router,
    public snackBar: MatSnackBar  // messages
  ) {
    this.getProfilesList();
  }



  public getProfilesList() {
    this._http.get(`${this.url}admin-bank/get-profiles-for-admin-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        (resp: any) => {
          if (resp.status == 0 && resp.message == 'successful') {
            this._ProfileTypesList = <ProfileTypes[]>resp.data;
            console.log(this._ProfileTypesList);

          }
        },
        error => {
          console.log('error', error);
        })
  }

  public createUser() {
    console.log(this._UserToCreate);
    
  }

}
