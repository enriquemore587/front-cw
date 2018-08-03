import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

export interface Banco {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.scss'],
  providers: [AutorizacionService]
})
export class AutorizacionComponent implements OnInit {

  public editing : boolean = false;

  public bancos: Banco[] = [
    { value: 1, viewValue: 'SANTANDER' },
    { value: 2, viewValue: 'BANORTE' },
    { value: 3, viewValue: 'BANCOMER' }
  ];
  selected = 2;

  constructor(
    public _AutorizacionService: AutorizacionService
  ) { }

  ngOnInit() {
  }


}
