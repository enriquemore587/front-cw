import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class DocumentosFirmarService {
  public url: string = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': localStorage.getItem('auth') });
  constructor(
    public _http: HttpClient
  ) {
    console.log('Documentos-firmar is running. . . !');
  }

  public sendImageTEST(file: File) {
    const fd = new FormData();
    fd.append('foto', file, file.name);
    this._http.post(`${this.url}ocr/comprobante-bot`, fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          console.log(Math.round(event.loaded / event.total) * 100 + "%");

        }

      });
  }

  public downloadPDF(title: string) {
    const doc = new jsPDF();
    doc.text(35, 25, title);
    doc.save(`${title}.pdf`);
  }
}
