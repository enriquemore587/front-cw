import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDirectorBancoComponent } from './components/main-director-banco/main-director-banco.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { BusquedaExpedientesComponent } from './components/busqueda-expedientes/busqueda-expedientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { SolicitantesComponent } from './components/solicitantes/solicitantes.component';

const DirectorRoutingRoutes: Routes = [
    {
        path: 'director-panel',
        component: MainDirectorBancoComponent,
        children: [
            { path: '', redirectTo: 'auditoria', pathMatch: 'full' },
            { path: 'auditoria', component: AuditoriaComponent },
            { path: 'busqueda-expedientes', component: BusquedaExpedientesComponent },
            { path: 'detalle-cliente', component: DetalleClienteComponent },
            { path: 'solicitantes', component: SolicitantesComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(DirectorRoutingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DirectorRoutingModule{
    
}