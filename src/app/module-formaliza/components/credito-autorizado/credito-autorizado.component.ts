import { Component, OnInit } from '@angular/core';
import { DetalleClienteService } from '../../services/detalle-cliente.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-credito-autorizado',
  templateUrl: './credito-autorizado.component.html',
  styleUrls: ['./credito-autorizado.component.scss'],
  providers: [DetalleClienteService]
})
export class CreditoAutorizadoComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor(
    public _DetalleClienteService : DetalleClienteService
  ) { }

  ngOnInit() {
  }


}
