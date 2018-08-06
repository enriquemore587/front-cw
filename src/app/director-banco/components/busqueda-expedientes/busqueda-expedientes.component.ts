import { Component, OnInit } from '@angular/core';
import { BusquedaExpedientesService } from '../../services/busqueda-expedientes.service';

@Component({
  selector: 'app-busqueda-expedientes',
  templateUrl: './busqueda-expedientes.component.html',
  styleUrls: ['./busqueda-expedientes.component.scss'],
  providers: [BusquedaExpedientesService]
})
export class BusquedaExpedientesComponent implements OnInit {

  

  constructor(
    public _BusquedaExpedientesService : BusquedaExpedientesService
  ) { }

  ngOnInit() {
    localStorage.removeItem('user_information');
  }

  showNextBTN() {
    if (this._BusquedaExpedientesService.options.nameClient != 'Usuario no encontrado') return true;
    return false;
  }

}
