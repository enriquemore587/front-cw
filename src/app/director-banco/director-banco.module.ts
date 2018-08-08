import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDirectorBancoComponent } from './components/main-director-banco/main-director-banco.component';
import { HeaderDirectorBancoComponent } from './components/header-director-banco/header-director-banco.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { BusquedaExpedientesComponent } from './components/busqueda-expedientes/busqueda-expedientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { DirectorRoutingModule } from './director-banco-Routing';
import { SourceMaterialModule } from '../material/app.material';
import { HttpModule } from '@angular/http';
import { SolicitantesComponent } from './components/solicitantes/solicitantes.component';

@NgModule({
  imports: [
    CommonModule,
    DirectorRoutingModule,
    SourceMaterialModule,
    HttpModule
  ],
  declarations: [
    MainDirectorBancoComponent,
    HeaderDirectorBancoComponent,
    AuditoriaComponent,
    BusquedaExpedientesComponent,
    DetalleClienteComponent,
    SolicitantesComponent
  ],
  exports: [MainDirectorBancoComponent]
})
export class DirectorBancoModule { }
