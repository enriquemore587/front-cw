import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DownReason } from '../models/DownReason';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public downReasonList: DownReason[] = [];

  constructor(
    private _http: HttpClient,
    private _Router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar  // messages
  ) {
    this.getDownReasons();
  }

  public getDownReasons() {
    this._http.get(`${this.url}admin-bank/get-down-reasons-for-admin-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        (respuesta: any) => {
          if (respuesta.status == 0 && respuesta.message == 'successful') {
            this.downReasonList = <DownReason[]>respuesta.data;
          }
        },
        error => console.log('error', error))
  }
}
