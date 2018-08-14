import { Component, OnInit } from '@angular/core';
import { BusquedaUsuariosService } from '../../services/busqueda-usuarios.service';
import { UserItem } from '../../models/UserItem';


@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.scss'],
  providers: [BusquedaUsuariosService]
})
export class BusquedaUsuariosComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'mail', 'profile', 'num_client', 'ver'];
  constructor(
    public _BusquedaUsuariosService: BusquedaUsuariosService
  ) {
    localStorage.removeItem('user_to_edit');
    this._BusquedaUsuariosService.getUserList();
  }

  ngOnInit() {
  }

  public showDetail() {
  }
}
