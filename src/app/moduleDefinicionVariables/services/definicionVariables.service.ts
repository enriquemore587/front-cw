import { Injectable } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { ResponseVI } from '../models/responseVI';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { ItemCheck } from '../models/requestCheck';
import { GenericResponse } from '../models/genericResponse';
import { ResponseIB } from '../models/responseIndicadoresBuro';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefinicionVariablesService {
  private url : string = environment.url;
  private httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json', 'Authorization':  localStorage.getItem('auth') } );



  public auth: string;

  constructor(
    private _http: HttpClient
  ) { }


  getVariables() : Observable<ResponseVI> {
    return this._http.get<ResponseVI>( this.url+"usersBank/vars-check/indicadores-buro", { headers: this.httpHeaders } );
  }

  getCriteriosIndicadores() : Observable<ResponseIB> {
    return this._http.get<ResponseIB>( this.url+"usersBank/criterios/indicadores-buro", { headers: this.httpHeaders } );
  }

  getVariablesClientes() : Observable<ResponseVI> {
    return this._http.get<ResponseVI>( this.url+"usersBank/vars-check/perfil-cliente", { headers: this.httpHeaders } );
  }

  setChect(item: ItemCheck) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/vars-check/indicadores-buro', params, {headers: this.httpHeaders});

  }

  setBankVariable(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/criterios/indicadores-buro', params, {headers: this.httpHeaders});

  }
  
  change_a_ICC(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.put<any>(this.url+'usersBank/criterios/change-icc-bank', params, {headers: this.httpHeaders});

  }

  getIccBank(icc) : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/criterios/icc-bank?icc="+icc, { headers: this.httpHeaders } );
  }

  getScoreBank() : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/criterios/get-score-bank", { headers: this.httpHeaders } );
  }

  setAScoreBank(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/criterios/set-a-score-bank', params, {headers: this.httpHeaders});

  }

  getIccBuro(icc) : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/criterios/icc-buro?icc="+icc, { headers: this.httpHeaders } );
  }

  getHelp_score(start) : Observable<any> {
    console.log('start', start);
    return this._http.get<any>( this.url+"usersBank/criterios/getHelp_score?start="+start, { headers: this.httpHeaders } );
  }


  ///////// criterios Indicadores Perfil cliente
  getCriteriosIndicadoresPerfilCliente() : Observable<ResponseIB> {
    return this._http.get<ResponseIB>( this.url+"usersBank/criterios/perfil-cliente", { headers: this.httpHeaders } );
  }

  getOccupations() : Observable<ResponseIB> {
    return this._http.get<ResponseIB>( this.url+"usersBank/criterios/get-ocupation", { headers: this.httpHeaders } );
  }

  setACheckOcupations(item: string) : any{

    let params = JSON.stringify({value:item});

    return this._http.put<any>(this.url+'usersBank/criterios/set-a-check-ocupations', params, {headers: this.httpHeaders});

  }

  setACheckNations(item: string) : any{

    let params = JSON.stringify({value:item});

    return this._http.put<any>(this.url+'usersBank/criterios/set-a-check-nationalites', params, {headers: this.httpHeaders});

  }

  //// calc
  getAllVarsBanco() : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/formulas/get-all-vars-banco", { headers: this.httpHeaders } );
  }

  setABankCustomVariable(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/formulas/set-a-bank-custom-variable', params, {headers: this.httpHeaders});

  }

  getAllCustomVarsBanco() : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/formulas/get-a-bank-custom-variable", { headers: this.httpHeaders } );
  }

  setListBankCustomVariables(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/formulas/set-list-bank-custom-variables', params, {headers: this.httpHeaders});

  }

  set_variables_will_be_output(item: any) : any{

    let params = JSON.stringify(item);

    return this._http.post<any>(this.url+'usersBank/formulas/set-variables-will-be-output', params, {headers: this.httpHeaders});

  }

  getBankFollowVariablesByBank() : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/formulas/get-bank-follow-variables-by-bank", { headers: this.httpHeaders } );
  }

  getOrderDefaultVariablesByBank() : Observable<any> {
    return this._http.get<any>( this.url+"usersBank/formulas/get-order-default-variables-by-bank", { headers: this.httpHeaders } );
  }


  delete_a_custom_variable(item: string) : any{

    return this._http.delete<any>(`${this.url}usersBank/formulas/delete-a-custom-variable/${item}`, {headers: this.httpHeaders});

  }

  clear_tree() : any{

    return this._http.delete<any>(`${this.url}usersBank/formulas/clear-tree`, {headers: this.httpHeaders});

  }
  

  getAuth() {
    let auth = localStorage.getItem('auth');
    
    if (auth != "undefined") {
      this.auth = auth;
    }else{
      this.auth = null;
    }
    return this.auth;
  }

}
