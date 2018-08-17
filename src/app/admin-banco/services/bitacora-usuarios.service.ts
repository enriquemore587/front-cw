import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ItemBitacora } from '../models/ItemBitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraUsuariosService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });


  constructor(
    private _http: HttpClient,
    private _Router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar  // messages
  ) {
    this.get_bitacora_usuarios_for_admin_bank();
   }
   public ELEMENT_DATA: ItemBitacora[] = [];
   public dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  public get_bitacora_usuarios_for_admin_bank() {
    this._http.get(`${this.url}admin-bank/get-bitacora-usuarios-for-admin_bank`,
      { headers: this.httpHeaders })
      .subscribe(
        (respuesta: any) => {
          if (respuesta.status == 0 && respuesta.message == 'successful') {
            this.ELEMENT_DATA = <ItemBitacora[]>respuesta.data;
          }
        },
        error => {
          console.log('error', error);
        })
  }
}
