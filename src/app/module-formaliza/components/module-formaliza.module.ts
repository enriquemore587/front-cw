import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormalziaRoutingModule } from './module-formaliza-Routing.module';
import { SourceMaterialModule } from '../../material/app.material';
import { MainFormalizaComponent } from './main-formaliza/main-formaliza.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeFinalizaComponent } from './welcome-finaliza/welcome-finaliza.component';
import { ListadoAprobacionesComponent } from './listado-aprobaciones/listado-aprobaciones.component';
import { HttpModule } from '@angular/http';
import { DocumentosClienteComponent } from './documetnos-cliente/listado-aprobaciones.component';



@NgModule({
  imports: [
    CommonModule,
    FormalziaRoutingModule,
    SourceMaterialModule,
    HttpModule
  ],
  declarations: [MainFormalizaComponent, HeaderComponent, WelcomeFinalizaComponent, ListadoAprobacionesComponent,
    DocumentosClienteComponent]
})
export class ModuleFormalizaModule { }
