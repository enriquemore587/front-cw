import { Component, OnInit } from '@angular/core';
import { BitacoraUsuariosService } from '../../services/bitacora-usuarios.service';

@Component({
  selector: 'app-bitacora-usuarios',
  templateUrl: './bitacora-usuarios.component.html',
  styleUrls: ['./bitacora-usuarios.component.scss'],
  providers: [BitacoraUsuariosService]
})
export class BitacoraUsuariosComponent implements OnInit {

  public displayedColumns: string[] = ['nombre', 'date_movement', 'tipo_movimiento', 'responsable'];
  constructor(
    public _BitacoraUsuariosService: BitacoraUsuariosService
  ) { }

  ngOnInit() {
  }

}
