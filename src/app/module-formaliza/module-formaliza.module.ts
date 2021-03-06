import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormalziaRoutingModule } from './module-formaliza-Routing.module';
import { SourceMaterialModule } from '../material/app.material';
import { HttpModule } from '@angular/http';
import { MainFormalizaComponent } from './components/main-formaliza/main-formaliza.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeFinalizaComponent } from './components/welcome-finaliza/welcome-finaliza.component';
import { ListadoAprobacionesComponent } from './components/listado-aprobaciones/listado-aprobaciones.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { DoumentosClienteComponent } from './components/documentos-cliente/documentos-cliente.component';
import { DocumentosFirmarComponent } from './components/documentos-firmar/documentos-firmar.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { CreditoAutorizadoComponent } from './components/credito-autorizado/credito-autorizado.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';



@NgModule({
  imports: [
    CommonModule,
    FormalziaRoutingModule,
    SourceMaterialModule,
    HttpModule
  ],
  declarations: [MainFormalizaComponent, HeaderComponent, WelcomeFinalizaComponent, ListadoAprobacionesComponent,
    DetalleClienteComponent, DoumentosClienteComponent, DocumentosFirmarComponent, AutorizacionComponent, CreditoAutorizadoComponent, PdfViewComponent],
  entryComponents: [PdfViewComponent]
})
export class ModuleFormalizaModule { }
