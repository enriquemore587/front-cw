import { Injectable } from "@angular/core";
import { GLOBAL } from "../../services/global";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { log } from "util";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: "root"
})
export class trackingService {
  private url: string = environment.url;
  
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });


  public auth: string;

  constructor(private _http: HttpClient) {}

  getTracking(dateMon): Observable<any> {    
    return this._http.get<any>(this.url + "requestProcess/consult?date=" + dateMon, { headers: this.httpHeaders });
  }

}
