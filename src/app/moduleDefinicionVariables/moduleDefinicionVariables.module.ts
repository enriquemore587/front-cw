/** IPMORTO TODOS LOS MODULOS NECESARIOS PARA CREAR UN MODULO */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DefinicionVariablesRoutingModule } from './DefinicionVariablesRouting.module';

/** IMPORTO TODOS LOS COMPONENTES DE ESTE MODULE  */
import { IndicadoresComponent } from './components/indicadoresBuro/indicadores.component';
import { PerfilComponent } from './components/perfilCliente/perfil.component';
import { CriteriosBuro } from './components/criteriosIndicadoresBuro/criteriosBuro.component';
import { CriteriosPerfilClienteComponent } from './components/criteriosPerfilCliente/criteriosPerfilCliente.component';
import { ScoringComponent } from './components/scoring/scoring.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MainDefinicionVariablesComponent } from './components/mainDefinicionVariables/mainDefinicionVariables.component';

import { SourceMaterialModule } from '../material/app.material';
import { ModuloLogin } from '../moduleLogin/moduleLogin.module';

@NgModule({
    imports: [CommonModule, 
        FormsModule, 
        DefinicionVariablesRoutingModule, 
        HttpModule, 
        SourceMaterialModule,
        ModuloLogin
    ],
    declarations: [
        MainDefinicionVariablesComponent,
        IndicadoresComponent,
        PerfilComponent,
        CriteriosBuro,
        CriteriosPerfilClienteComponent,
        ScoringComponent,
        ArbolComponent
    ],
    exports: [/** ESTO SE PUEDE HACER SI SEVA HA HACER USO DE ALGÚN COMPONENTE EN ESPESIFICO EN ESTE CASO NO SE HARA PERO NO AFECTA EL HACERLO */
        IndicadoresComponent,
        PerfilComponent,
        SourceMaterialModule,
        CriteriosBuro,
        CriteriosPerfilClienteComponent,
        ScoringComponent,
        ArbolComponent
    ],
    providers: []
})
export class ModuloDefinicionVariables {

}