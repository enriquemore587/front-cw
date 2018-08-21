import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Image } from '../../models/image';
import { saveAs } from 'file-saver';
import { UserFound } from '../../models/UserFound';


@Injectable({
  providedIn: 'root'
})
export class DocumentosClienteService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  public imageList: Image[] = [];
  public userFound: UserFound = new UserFound();
  public BTN_SELECTED: any = {
    textBTN: 'INE Frente',
    location: ''
  };
  public imageBTNS: any = {
    INE: {
      textBTN: 'INE Frente',
      location: ''
    },
    BACK: {
      textBTN: 'INE Reverso',
      location: ''
    },
    INGRESOS: {
      textBTN: 'COMPROBANTE DE INGRESOS',
      location: ''
    },
    DOMICILIO: {
      textBTN: 'COMPROBANTE DE DOMICILIO',
      location: ''
    },
    SOLICITUD: {
      textBTN: 'Solicitud electrónica',
      location: ''
    },
    TABLA: {
      textBTN: 'Tabla de amortización',
      location: ''
    }
  };
  constructor(
    private _http: HttpClient
  ) {
    this.userFound = <UserFound>JSON.parse(localStorage.getItem('user_information'));
    this.getLocationsByUserSuccess(this.userFound.user_id, true);
  }


  public getLocationsByUserSuccess(user_id: string, success: boolean) {
    this._http.get<any>(`${this.url}admin/get-locations-by-user-success?user_id=${user_id}&success=${success}`, { headers: this.httpHeaders })
      .subscribe(
        pathList => {
          this.imageList = <Image[]>pathList;
          this.imageList.forEach(img => {
            if (img.ocr_process_id == 1) {
              this.imageBTNS.INE.location = img.location;
            }
            else if (img.ocr_process_id == 2) {
              this.imageBTNS.BACK.location = img.location;
            }
            else if (img.ocr_process_id == 3) {
              this.imageBTNS.INGRESOS.location = img.location;
            }
            else if (img.ocr_process_id == 4) {
              this.imageBTNS.DOMICILIO.location = img.location;
            }
          });
          this.BTN_SELECTED.location = this.imageBTNS.INE.location;
        },
        error => {
          console.log('error', error);
        })
  }

  public getAImage() {
    let body = { imageFile: this.BTN_SELECTED.location };
    this._http.post(`${this.url}admin/get-image-file2`, body,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob' })
      .subscribe(
        img => {
          saveAs(img, this.BTN_SELECTED.textBTN);
        },
        error => {
          console.log('error', error);
        })
  }

  public setName(newName: any) {
    this.BTN_SELECTED.textBTN = newName.textBTN;
    this.BTN_SELECTED.location = newName.location;
  }
}
