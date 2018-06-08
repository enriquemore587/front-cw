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
@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  private url : string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });

  private httpHeaders2 = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': GLOBAL.tokenTEST });



  public auth: string;

  constructor(
    private _http: HttpClient
  ) { }

  getVariablesToValid(): Observable<any> {
    return this._http.get<any>(this.url + "usersBank/pruebas/get-list-to-validation", { headers: this.httpHeaders });
  }

  validateRange(item: ReqValidateRange): any {

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url + 'usersBank/pruebas/validate-range', params, { headers: this.httpHeaders });

  }

  validateList(list: ReqValidateList): any {

    let params = JSON.stringify(list);

    return this._http.post<any>(this.url + 'usersBank/pruebas/validate-list', params, { headers: this.httpHeaders });

  }
  getOccupations(): Observable<any> {
    return this._http.get<any>(this.url + "usersBank/criterios/get-ocupation", { headers: this.httpHeaders });
  }

  get_user_for_test(): Observable<any> {
    return this._http.get<any>(this.url + "users/get-user-for-test", { headers: this.httpHeaders2 });
  }

  runValidation(obj: any): any {

    let params = JSON.stringify(obj);
    return this._http.post<any>(this.url + 'users/user_request_credit', params, { headers: this.httpHeaders2 });

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
