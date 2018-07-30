import { Component, OnInit } from '@angular/core';
import { ListadoAprobacionesService } from '../../services/listado-aprobaciones.service';

@Component({
  selector: 'app-documentos-cliente',
  templateUrl: './documentos-cliente.component.html',
  styleUrls: ['./documentos-cliente.component.scss'],
  providers: [ListadoAprobacionesService]
})
export class DocumentosClienteComponent implements OnInit {
  
  constructor(
    public _ListadoAprobacionesService : ListadoAprobacionesService
  ) { }

  ngOnInit() {
  }

}
