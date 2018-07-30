import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routing, appToutingProviders } from './app.routing';

import { ModuloLogin } from './moduleLogin/moduleLogin.module';
import { ModuloDefinicionVariables } from './moduleDefinicionVariables/moduleDefinicionVariables.module';
import { ModuloPruebas } from './modulePruebas/modulePruebas.module';
import { ModuleTrackingModule } from './module-tracking/module-tracking.module';
import { AdminOneModule } from './admin-one/admin-one.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';


import { SourceMaterialModule } from './material/app.material';
import { ModuleFormalizaModule } from './module-formaliza/components/module-formaliza.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    SourceMaterialModule,
    ModuloLogin,
    routing,
    ModuloDefinicionVariables,
    ModuloPruebas,
    ModuleTrackingModule,
    AdminOneModule,
    ModuleFormalizaModule
  ],
  exports: [SourceMaterialModule],
  entryComponents: [],  /** LINE OF MATERIAL.ANGULAR.JS */
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, appToutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
