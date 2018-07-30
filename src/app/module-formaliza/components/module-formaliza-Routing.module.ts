import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormalizaComponent } from './main-formaliza/main-formaliza.component';
import { WelcomeFinalizaComponent } from './welcome-finaliza/welcome-finaliza.component';
import { ListadoAprobacionesComponent } from './listado-aprobaciones/listado-aprobaciones.component';
import { DocumentosClienteComponent } from './documetnos-cliente/listado-aprobaciones.component';



const FormalizaRoutes: Routes = [
    {
        path: 'formaliza',
        component: MainFormalizaComponent,
        children: [
            { path: '', redirectTo: 'documentos-cliente', pathMatch: 'full' },
            { path: 'listado-aprobaciones', component: ListadoAprobacionesComponent },
            { path: 'documentos-cliente', component: DocumentosClienteComponent}
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
