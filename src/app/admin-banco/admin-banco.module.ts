import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './componets/main/main.component';
import { HeaderAdminComponent } from './componets/header-admin/header-admin.component';
import { BusquedaUsuariosComponent } from './componets/busqueda-usuarios/busqueda-usuarios.component';
import { AdminRoutingModule } from './admin-Routing';
import { SourceMaterialModule } from '../material/app.material';
import { HttpModule } from '@angular/http';
import { EditUserComponent } from './componets/edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SourceMaterialModule,
    HttpModule
  ],
  declarations: [MainComponent, HeaderAdminComponent, BusquedaUsuariosComponent, EditUserComponent],
  exports: [ MainComponent ]
})
export class AdminBancoModule { }
