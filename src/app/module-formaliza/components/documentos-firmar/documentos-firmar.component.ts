import { Component, OnInit } from '@angular/core';
import { DocumentosFirmarService } from '../../services/documentos-firmar.service';
import { MatDialog } from '@angular/material';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.scss'],
  providers: [DocumentosFirmarService]
})
export class DocumentosFirmarComponent implements OnInit {

  public statusOPC = {
    contrato: 1,
    pagare: 1,
    consentimiento: 1,
    solicitud: 1,
    tabla: 1
  };

  constructor(
    public _DocumentosFirmarService: DocumentosFirmarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public filesToUpload: File;
  public contratoFileToUpload(fileInput: any) {
    this.statusOPC.contrato = 3;
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log('contratoFileToUpload', this.filesToUpload);
    this._DocumentosFirmarService.sendImageTEST(this.filesToUpload);
  }

  public pagareFileToUpload(fileInput: any) {
    this.statusOPC.pagare = 3;
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log('pagareFileToUpload', this.filesToUpload);
    this._DocumentosFirmarService.sendImageTEST(this.filesToUpload);
  }
  public consentimientoFileToUpload(fileInput: any) {
    this.statusOPC.consentimiento = 3;
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log('consentimientoFileToUpload', this.filesToUpload);
    this._DocumentosFirmarService.sendImageTEST(this.filesToUpload);
  }

  
  public tablaFileToUpload(fileInput: any) {
    this.statusOPC.tabla = 3;
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log('tablaFileToUpload', this.filesToUpload);
    this._DocumentosFirmarService.sendImageTEST(this.filesToUpload);
  }

  public solicitudFileToUpload(fileInput: any) {
    this.statusOPC.solicitud = 3;
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log('solicitudFileToUpload', this.filesToUpload);
    this._DocumentosFirmarService.sendImageTEST(this.filesToUpload);
  }

  donwloadContrato(name: string) {
    if (name == 'CONTRATO') this.statusOPC.contrato = 2;
    else if (name == 'PAGARÉ') this.statusOPC.pagare = 2;
    else if (name == 'CONSENTIMIENTO') this.statusOPC.consentimiento = 2;

    this._DocumentosFirmarService.downloadPDF(name);
  }

  public sendURL(url: string) {
    if (url == 'CONTRATO') this.statusOPC.contrato = 2;
    else if (url == 'PAGARÉ') this.statusOPC.pagare = 2;
    else if (url == 'CONSENTIMIENTO') this.statusOPC.consentimiento = 2;
    else if (url == 'Solicitud electrónica') this.statusOPC.solicitud = 2;
    else if (url == 'Tabla de amortización') this.statusOPC.tabla = 2;

    const dialogRef = this.dialog.open(PdfViewComponent, {
      width: '100vh',
      data: { url: url, action: 'descargar' } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  public save(url: string) {


    console.log(url);
    const dialogRef = this.dialog.open(PdfViewComponent, {
      width: '100vh',
      data: { url: url, action: 'guardar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
