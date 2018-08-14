import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserItem } from '../models/UserItem';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusquedaUsuariosService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });

  
  constructor(
    private _http: HttpClient,
    private _Router : Router
  ) { }

  public ELEMENT_DATA: UserItem[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  public getUserList() {
    this._http.get(`${this.url}admin-bank/get-list-users-for-admin-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful') {
            this.ELEMENT_DATA = <UserItem[]>respuesta.data.users_list;
          }
        },
        error => {
          console.log('error', error);
        })
  }

  public editUser(element: UserItem){
    localStorage.setItem('user_to_edit', JSON.stringify(element));
    this._Router.navigate(['/admin-panel/edit-user']);
  }

}
