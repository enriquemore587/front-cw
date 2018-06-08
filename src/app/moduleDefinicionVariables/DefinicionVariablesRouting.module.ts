import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndicadoresComponent } from './components/indicadoresBuro/indicadores.component';
import { PerfilComponent } from './components/perfilCliente/perfil.component';
import { CriteriosBuro } from './components/criteriosIndicadoresBuro/criteriosBuro.component';
import { CriteriosPerfilClienteComponent } from './components/criteriosPerfilCliente/criteriosPerfilCliente.component';
import { ScoringComponent } from './components/scoring/scoring.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MainDefinicionVariablesComponent } from './components/mainDefinicionVariables/mainDefinicionVariables.component';

const DefinicionVariablesRoutes: Routes = [
    {
        path: 'definicion-variables',
        component: MainDefinicionVariablesComponent,
        children: [
            { path: '', redirectTo: 'activacion-variables-cliente', 
            pathMatch: 'full' },
            { path: 'activacion-variables-indicadores', 
            component: IndicadoresComponent },
            { path: 'activacion-variables-cliente',
             component: PerfilComponent },
            
            { path: 'criterios-indicadores', 
            component: CriteriosBuro },
            { path: 'criterios-cliente', 
            component: CriteriosPerfilClienteComponent },
            { path: 'scoring', 
            component: ScoringComponent },

            { path: 'arbol', 
            component: ArbolComponent }
            
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(DefinicionVariablesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DefinicionVariablesRoutingModule{
    
}