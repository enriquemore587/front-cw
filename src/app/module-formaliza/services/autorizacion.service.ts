import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserFound } from '../../models/UserFound';


@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public userFount: UserFound = new UserFound();
  public nombre_usuario: string = localStorage.getItem('nombre_usuario');
  constructor(
    public _http: HttpClient
  ) {
    console.log("Authorization Service is running. . .");
    
    this.getUserInformation();
  }

  public getUserInformation() {
    this.userFount = <UserFound>JSON.parse(localStorage.getItem('user_information'));
  }
}