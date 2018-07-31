import { Injectable } from '@angular/core';
import { UserFound } from '../components/listado-aprobaciones/models/UserFound';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleClienteService {

  public userFount: UserFound = new UserFound();
  public url: string = environment.url;
  public httpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': localStorage.getItem('auth') });
  public nombre_usuario: string = localStorage.getItem('nombre_usuario');
  constructor(
    private _http: HttpClient
  ) {
    this.getUserInformation();
  }

  public getUserInformation() {
    this.userFount = <UserFound>JSON.parse(localStorage.getItem('user_information'));
    console.log(this.userFount);

  }

}
