import { Component, OnInit } from '@angular/core';
import { DetallesClienteService } from '../../services/detalles-cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
  providers: [DetallesClienteService]
})
export class DetalleClienteComponent implements OnInit {

  constructor(
    private _router: Router,
    public _DetallesClienteService: DetallesClienteService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user_information') == null) this._router.navigate(['/director-panel']);
  }

  isBTNActive(name: string) {
    return name == this._DetallesClienteService.BTN_SELECTED.textBTN ? '#AE9911' : '#8B98A1';
  }

  setName(newName: any) {
    this._DetallesClienteService.setName(newName);
  }

}
