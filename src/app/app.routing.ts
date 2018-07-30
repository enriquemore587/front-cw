import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './moduleLogin/components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

export const appToutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
