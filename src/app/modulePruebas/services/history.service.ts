import { Injectable } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { log } from 'util';

// models
import { ReqValidateRange } from '../models/reqValidateRange';
import { ReqValidateList } from '../models/reqValidateList';
import { environment } from '../../../environments/environment';
import { Solicitud } from '../components/history/solicitud';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });

  public registrosList: Solicitud[] = [];

  public auth: string;

  constructor(
    private _http: HttpClient
  ) { }

  getListRegistros() {
    this._http.get<any>(this.url + "usersBank/pruebas/solicitudes", { headers: this.httpHeaders })
      .subscribe(response => {
        if (response.status == 0) {
          response.data.forEach((registro, index) => {
            this.registrosList = [...this.registrosList,
            new Solicitud(
              registro.id,
              registro.content[1].value == 1 ? 'MEXICANA' : 'EXTRANJERA',
              registro.content[2].value,
              registro.content[3].value,
              registro.content[4].value,
              registro.content[5].value / 100,
              registro.content[6].value == 2 ? 'SI' : 'NO',
              registro.content[7].value,
              registro.content[8].value,
              registro.content[9].value,
              registro.content[10].value,
              registro.content.length > 11 ? registro.content[11].value : 0,
              registro.content.length > 12 ? registro.content[12].value : 0,
              registro.content.length > 13 ? registro.content[13].value : 0,
              registro.content.length > 14 ? registro.content[14].value : 0,
              0,
              0,
              0,
              0,
              registro.approved,
              registro.reason
            )];
          });

          let temp = [];

          response.data.map(registro => {
            registro.content.map(x => {
              if (x.salida == 1) {
                temp = [...temp, { id: registro.id, value: x.value, salida: x.salida }];
              }else if (x.salida == 2) {
                temp = [...temp, { id: registro.id, value: x.value, salida: x.salida }];
              }else if (x.salida == 3) {
                temp = [...temp, { id: registro.id, value: x.value, salida: x.salida }];
              }else if (x.salida == 4) {
                temp = [...temp, { id: registro.id, value: x.value, salida: x.salida }];
              }
            })
          });

          
          

          this.registrosList.forEach(element => {
            temp.forEach(item => {
              if (element.id == item.id) {
                if (item.salida == 1) element.mensualidad = item.value;
                if (item.salida == 2) element.plazo = item.value;
                if (item.salida == 3) element.linea_aprobada = item.value;
                if (item.salida == 4) element._tasa = item.value;
              }
            });
          });
        }
      });
  }

  getAuth() {
    let auth = localStorage.getItem('auth');

    if (auth != "undefined") {
      this.auth = auth;
    } else {
      this.auth = null;
    }
    return this.auth;
  }

}
