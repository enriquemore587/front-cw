import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

export interface Banco {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.scss'],
  providers: [AutorizacionService]
})
export class AutorizacionComponent implements OnInit {
  bancos: Banco[] = [
    { value: 'steak-0', viewValue: 'SANTANDER' },
    { value: 'pizza-1', viewValue: 'BANORTE' },
    { value: 'tacos-2', viewValue: 'BANCOMER' }
  ];
  selected = "steak-0";

  constructor(
    public _AutorizacionService: AutorizacionService
  ) { }

  ngOnInit() {
  }


}
