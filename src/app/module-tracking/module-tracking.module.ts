
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModuleTrackingRouting } from './module-tracking-routing.module';

/** IMPORTO TODOS LOS COMPONENTES DE ESTE MODULE  */

import { MainTrackingComponent } from './components/main-tracking/main-tracking.component';

import { SourceMaterialModule } from '../material/app.material';



@NgModule({
  imports: [CommonModule, FormsModule, ModuleTrackingRouting, HttpModule , SourceMaterialModule],
  declarations: [ MainTrackingComponent ],
  exports: [
    MainTrackingComponent
    ],
    providers: []
})
export class ModuleTrackingModule { }
