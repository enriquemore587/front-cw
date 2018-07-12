import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../components/users-list/models/user';
import { log } from 'util';
import { GeneralInformation } from '../components/users-list/models/generalInformation';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public userList: User[] = [];
  public generalInformation: GeneralInformation;

  constructor(
    private _http: HttpClient
  ) {
    this.getUsersListFromServer();
  }

  private getUsersListFromServer() {
    this._http.get<any>(`${this.url}admin/get-users-list`, { headers: this.httpHeaders })
      .subscribe(
        listaUsuarios => {
          this.userList = [...listaUsuarios.usuarios];
          this.generalInformation = new GeneralInformation('', 0, new Date(), '');
        },
        error => {
          console.log('error', error);
        })
  }

  public getGeneralPersonalData(user_id: string) {
    this.generalInformation = new GeneralInformation('', 0, new Date(), '');
    this._http.get<any>(`${this.url}admin/get-general-information-user?user_id=${user_id}`, { headers: this.httpHeaders })
      .subscribe(
        respuesta => {
          if (respuesta.status == 0 && respuesta.data != undefined) {
            respuesta.data.nombrecompleto.replace(" _", '');
            this.generalInformation = <GeneralInformation>respuesta.data;
          }
        },
        error => {
          console.log('error', error);
        })
  }
}
