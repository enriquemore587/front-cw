import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';


import { routing, appToutingProviders } from './app.routing';

import { ModuloLogin } from './moduleLogin/moduleLogin.module';
import { ModuloDefinicionVariables } from './moduleDefinicionVariables/moduleDefinicionVariables.module';
import { ModuloPruebas } from './modulePruebas/modulePruebas.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';


import { SourceMaterialModule } from './material/app.material';



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
    ModuloPruebas
  ],
  exports: [SourceMaterialModule],
  entryComponents: [],  /** LINE OF MATERIAL.ANGULAR.JS */
  providers: [appToutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
