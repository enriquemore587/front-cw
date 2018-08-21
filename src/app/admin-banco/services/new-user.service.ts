import { Injectable } from '@angular/core';
import { ProfileTypes } from '../models/ProfileTypes';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserToCreate } from '../models/UserToCreate';

import * as sha1 from 'js-sha1';

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
    private _router: Router,
    public snackBar: MatSnackBar  // messages
  ) {
    this.getProfilesList();
  }

  public getProfilesList() {
    this._http.get(`${this.url}admin-bank/get-profiles-for-admin-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        (resp: any) => {
          if (resp.status == 0 && resp.message == 'successful') this._ProfileTypesList = <ProfileTypes[]>resp.data;
        },
        error => console.log('error', error)
      );
  }

  public createUser() {
    if (this._UserToCreate._READY()) {
      this._UserToCreate.pwd = sha1(this._UserToCreate.pwd);
      this._http.post(`${this.url}admin-bank/create-user-bank-for-admin-bank`, this._UserToCreate, { headers: this.httpHeaders })
        .subscribe(
          (res: any) => {
            if (res.status == 0 && res.message == 'successful') {
              this.showMessage('Usuario creado exitosamente', 'Ocultar');
              // this._UserToCreate = new UserToCreate();
              this._router.navigate(['/admin-panel']);
            }
            else {
              this.showMessage(`${res.message} ya registrado`, 'Ocultar');
              this._UserToCreate.pwd = '';
            }
          },
          (err: any) => console.log('error', err)
        );
    }
  }

  // start Metodo Messages
  public showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages
}
