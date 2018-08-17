import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserItem } from '../models/UserItem';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../componets/confirmation/confirmation.component';
import { log } from 'util';
import { UserToDown } from '../models/UserToDown';


@Injectable({
  providedIn: 'root'
})
export class BusquedaUsuariosService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });


  constructor(
    private _http: HttpClient,
    private _Router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar  // messages
  ) { }

  public ELEMENT_DATA: UserItem[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  public getUserList() {
    this._http.get(`${this.url}admin-bank/get-list-users-for-admin-bank`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserItem[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }

  public get_list_users_for_admin_bank_like_email(input: string) {
    this._http.get(`${this.url}admin-bank/get-list-users-for-admin-bank-like-email?input=${input}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserItem[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }


  public get_list_users_for_admin_bank_like_num(input: string) {
    this._http.get(`${this.url}admin-bank/get-list-users-for-admin-bank-like-num?input=${input}`,
      { headers: this.httpHeaders })
      .subscribe(
        resp => {
          let respuesta: any = <any>resp;
          if (respuesta.status == 0 && respuesta.message == 'successful')
            this.ELEMENT_DATA = <UserItem[]>respuesta.data.users_list;
          else this.showMessage("Datos no disponibles", "Entendidos");
        },
        error => {
          console.log('error', error);
        })
  }

  public editUser(id: string) {
    localStorage.setItem('user_to_edit', id);
    this._Router.navigate(['/admin-panel/edit-user']);
  }

  public confirmar(item: UserItem) {
    let index = this.ELEMENT_DATA.indexOf(item);
    let userToDown: UserToDown = new UserToDown();
    userToDown.user_id = this.ELEMENT_DATA[index].id;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '100vh',
      data: { msg: `Baja de "${this.ELEMENT_DATA[index].mail}"`, action: 'Generar baja', userToDown: userToDown, data: index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.up_downUser(result.userToDown, result.index)
    });
  }

  public up_downUser(userToDown: UserToDown, index: number) {
    this._http.post(`${this.url}admin-bank/up-down-user-bank-for-admin-bank/`, userToDown,
      { headers: this.httpHeaders }).subscribe(
        (res: any) => {
          if (res.status == 0 && res.message == 'successful') {
            this.showMessage('Baja exitosa', 'Ocultar');
            this.ELEMENT_DATA = [
              ...this.ELEMENT_DATA.slice(0, index),
              ...this.ELEMENT_DATA.slice(index + 1)
            ];
          } else {
            this.showMessage('Baja no exitosa', 'Ocultar');
          }
        },
        (err: any) => console.log("ERROR", err)
      );
  }

  // start Metodo Messages
  public showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages
}
