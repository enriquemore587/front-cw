import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainPruebasComponent } from './components/mainPruebas/mainPruebas.component';
import { DefinicionCasosComponent } from './components/definicionCasos/definicionCasos.component';
import { HistoryComponent } from './components/history/history.component';
import { ValidacionFormulasComponent } from './components/validacionFormulas/validacionFormulas.component';

const PruebasRoutes: Routes = [
    {
        path: 'pruebas',
        component: MainPruebasComponent,
        children: [
            { path: '', redirectTo: 'validacion-formulas', pathMatch: 'full' },
            { path: 'validacion-formulas', component: ValidacionFormulasComponent },
            { path: 'definicion-casos', component: DefinicionCasosComponent },
            { path: 'history', component: HistoryComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(PruebasRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PruebasRoutingModule {

}
