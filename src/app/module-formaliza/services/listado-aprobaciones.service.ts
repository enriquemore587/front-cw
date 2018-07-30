import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserForFind } from '../components/listado-aprobaciones/models/UserForFind';
import { environment } from '../../../environments/environment';
import { UserFound } from '../components/listado-aprobaciones/models/UserFound';

@Injectable({
  providedIn: 'root'
})
export class ListadoAprobacionesService {

  public userForFind: UserForFind = new UserForFind('', '');
  public userFound: UserFound = new UserFound();
  public: string = '';
  public options: any = {
    rfc_curp: '',
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
    this._http.get<any>(`${this.url}ejecutivo/get-user-for-formaliza?valor=${valor}&search_mode=${search_mode}`, { headers: this.httpHeaders })
      .subscribe(response => {
        if (response.message == "no information") {
          this.options.nameClient = 'Usuario no encontrado';
          this.options.msg = '';
          return;
        }
        this.userFound = <UserFound>response.data;
        this.options.nameClient = `${this.userFound.nombre}  ${this.userFound.paterno} ${this.userFound.materno}`;
        this.options.msg = '1 solicitud aprobada pendiente de formalizar';
      });
  }

  public buscar(rfc_curp: boolean) {
    //bdd7e8e8-b561-e44b-3dde-b19c273c13f9    length
    let varToCheck = rfc_curp ? this.options.rfc_curp : this.options.n_folio;
    if (rfc_curp)
      this.getUserForFormaliza(varToCheck, varToCheck.length > 13 ? 'curp' : 'rfc');
    else
      this.getUserForFormaliza(varToCheck, 'folio');
  }

}
