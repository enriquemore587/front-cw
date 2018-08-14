import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserToEdit } from '../models/UserToEdit';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public _UserToEdit: UserToEdit = new UserToEdit();

  constructor(
    private _http: HttpClient,
    private _Router: Router
  ) {
    this.getUserToEdit();
  }

  public getUserToEdit() {
    this._http.get(`${this.url}admin-bank/get-a-user-for-admin-bank?user_id=${localStorage.getItem("user_to_edit")}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          this._UserToEdit = <UserToEdit> respuesta.data.data_user;
          console.log(this._UserToEdit);
        },
        error => {
          console.log('error', error);
        })
  }
}
