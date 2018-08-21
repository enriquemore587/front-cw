import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { UserSolicitante } from '../models/UserSolicitante';
import { environment } from '../../../environments/environment';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SolicitantesService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });

  constructor(
    private _http: HttpClient,
    private _Router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar  // messages
  ) {
    this.getSolicitantesList();
  }

  public ELEMENT_DATA: UserSolicitante[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  public getSolicitantesList() {
    this._http.get(`${this.url}direccion/get-list-solicitantes-for-director-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserSolicitante[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }

  public getSolicitantesListByNames(names: string) {    
    this._http.get(`${this.url}direccion/get-list-solicitantes-by-names-for-director-bank?names=${names}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserSolicitante[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }


  public getSolicitantesListByrfcurp(rfcurp: string) {
    this._http.get(`${this.url}direccion/get-list-solicitantes-by-rfc-curp-for-director-bank?rfcurp=${rfcurp}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserSolicitante[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }


  public getSolicitantesListByNUM(rfcurp: string) {
    this._http.get(`${this.url}direccion/get-list-solicitantes-by-num-for-director-bank?num=${rfcurp}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserSolicitante[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }

  // start Metodo Messages
  public showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages
}
