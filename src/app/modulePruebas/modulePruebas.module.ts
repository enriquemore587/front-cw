/** IPMORTO TODOS LOS MODULOS NECESARIOS PARA CREAR UN MODULO */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PruebasRoutingModule } from './PruebasRouting.module';

/** IMPORTO TODOS LOS COMPONENTES DE ESTE MODULE  */
import { DefinicionCasosComponent } from './components/definicionCasos/definicionCasos.component';
import { ValidacionFormulasComponent } from './components/validacionFormulas/validacionFormulas.component';
import { HistoryComponent } from './components/history/history.component';
import { MainPruebasComponent } from './components/mainPruebas/mainPruebas.component';

import { SourceMaterialModule } from '../material/app.material';

import { ModuloLogin } from '../moduleLogin/moduleLogin.module';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        PruebasRoutingModule,
        HttpModule,
        SourceMaterialModule,
        ModuloLogin

    ],
    declarations: [
        MainPruebasComponent,
        DefinicionCasosComponent,
        ValidacionFormulasComponent,
        HistoryComponent
    ],
    exports: [/** ESTO SE PUEDE HACER SI SEVA HA HACER USO DE ALGÚN COMPONENTE EN ESPESIFICO EN ESTE CASO NO SE HARA PERO NO AFECTA EL HACERLO */
        MainPruebasComponent,
        DefinicionCasosComponent,
        ValidacionFormulasComponent,
        HistoryComponent
    ],
    providers: []
})
export class ModuloPruebas {

}