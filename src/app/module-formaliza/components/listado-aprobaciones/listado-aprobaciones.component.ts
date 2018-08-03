import { Component, OnInit } from '@angular/core';
import { ListadoAprobacionesService } from '../../services/listado-aprobaciones.service';

@Component({
  selector: 'app-listado-aprobaciones',
  templateUrl: './listado-aprobaciones.component.html',
  styleUrls: ['./listado-aprobaciones.component.scss'],
  providers: [ListadoAprobacionesService]
})
export class ListadoAprobacionesComponent implements OnInit {

  constructor(
    public _ListadoAprobacionesService: ListadoAprobacionesService
  ) { }

  ngOnInit() {
    localStorage.removeItem('user_information');
  }

  showNextBTN() {
    if (this._ListadoAprobacionesService.options.nameClient != 'Usuario no encontrado') return true;
    return false;
  }

}
