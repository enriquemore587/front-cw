import { Component, OnInit } from '@angular/core';
import { DetalleClienteService } from '../../services/detalle-cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
  providers: [DetalleClienteService]
})
export class DetalleClienteComponent implements OnInit {
  
  constructor(
    public _DetalleClienteService : DetalleClienteService
  ) { }

  ngOnInit() {
  }

}
