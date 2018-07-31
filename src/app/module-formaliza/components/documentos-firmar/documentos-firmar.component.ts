import { Component, OnInit } from '@angular/core';
import { ListadoAprobacionesService } from '../../services/listado-aprobaciones.service';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.scss'],
  providers: [ListadoAprobacionesService]
})
export class DocumentosFirmarComponent implements OnInit {

  constructor(
    public _ListadoAprobacionesService: ListadoAprobacionesService
  ) { }

  ngOnInit() {
  }

  showNextBTN() {
    if (this._ListadoAprobacionesService.options.nameClient != 'Usuario no encontrado') return true;
    return false;
  }

}
