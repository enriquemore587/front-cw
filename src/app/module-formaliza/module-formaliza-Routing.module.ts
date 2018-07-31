import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormalizaComponent } from './components/main-formaliza/main-formaliza.component';
import { ListadoAprobacionesComponent } from './components/listado-aprobaciones/listado-aprobaciones.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { DoumentosClienteComponent } from './components/documentos-cliente/documentos-cliente.component';
import { DocumentosFirmarComponent } from './components/documentos-firmar/documentos-firmar.component';



const FormalizaRoutes: Routes = [
    {
        path: 'formaliza',
        component: MainFormalizaComponent,
        children: [
            { path: '', redirectTo: 'listado-aprobaciones', pathMatch: 'full' },
            { path: 'listado-aprobaciones', component: ListadoAprobacionesComponent },
            { path: 'detalle-cliente', component: DetalleClienteComponent },
            { path: 'documentos-cliente', component: DoumentosClienteComponent },
            {path: 'documentos-firma', component: DocumentosFirmarComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(FormalizaRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FormalziaRoutingModule {

}
