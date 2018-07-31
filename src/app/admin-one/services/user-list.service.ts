import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../components/users-list/models/user';
import { GeneralInformation } from '../components/users-list/models/generalInformation';
import { Location } from '../models/Locatios';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public userList: User[] = [];
  public generalInformation: GeneralInformation;
  public urlList: Location[];
  public urlListBad: Location[];

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
            this.generalInformation = <GeneralInformation>respuesta.data;
            this.generalInformation.nombreCompleto.replace('_', '');
          }
        },
        error => {
          console.log('error', error);
        })
  }

  public getLocationsByUserSuccess(user_id: string, success: boolean) {
    this._http.get<any>(`${this.url}admin/get-locations-by-user-success?user_id=${user_id}&success=${success}`, { headers: this.httpHeaders })
      .subscribe(
        pathList => {
          if (success) this.urlList = <Location[]>pathList;
          else this.urlListBad = <Location[]>pathList;
          // console.log('this.urlList', this.urlList);
          // console.log('this.urlListBad', this.urlListBad);
        },
        error => {
          console.log('error', error);
        })
  }
}
