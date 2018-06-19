import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { PerfilComponent } from './moduleDefinicionVariables/components/perfilCliente/perfil.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
  
  { path: '', redirectTo: 'definicion-variables/activacion-variables-cliente', pathMatch: 'full' },
  { path: 'definicion-variables/activacion-variables-cliente', component: PerfilComponent },
  { path: '**', component: ErrorComponent }
];

export const appToutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
