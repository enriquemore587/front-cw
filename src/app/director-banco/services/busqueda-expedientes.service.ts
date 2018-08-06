import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserFound } from '../../models/UserFound';
import { UserForFind } from '../../models/UserForFind';

@Injectable({
  providedIn: 'root'
})
export class BusquedaExpedientesService {

  public userForFind: UserForFind = new UserForFind('', '');
  public userFound: UserFound = new UserFound();
  public options: any = {
    rfc_curp: 'VEAE940421HMCRMN06',
    n_folio: '',
    msg: '',
    nameClient: ''
  };
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  constructor(
    private _http: HttpClient
  ) { }

  public getUserForFormaliza(valor: string, search_mode: string) {
    this._http.get<any>(`${this.url}direccion/get-user-for-formaliza?valor=${valor}&search_mode=${search_mode}`, { headers: this.httpHeaders })
      .subscribe(response => {
        if (response.message == "no information") {
          this.options.nameClient = 'Usuario no encontrado';
          this.options.msg = '';
          return;
        }
        this.userFound = <UserFound>response.data;
        console.log(this.userFound);

        localStorage.setItem('user_information', JSON.stringify(this.userFound));

        this.options.nameClient = `${this.userFound.nombre}  ${this.userFound.paterno} ${this.userFound.materno}`;
        this.options.msg = this.userFound.status_request ? '1 solicitud aprobada pendiente de formalizar' : '';
      });
  }

  public buscar(rfc_curp: boolean) {
    let varToCheck = rfc_curp ? this.options.rfc_curp : this.options.n_folio;
    if (rfc_curp)
      this.getUserForFormaliza(varToCheck, varToCheck.length > 13 ? 'curp' : 'rfc');
    else
      this.getUserForFormaliza(varToCheck, 'folio');
  }
}