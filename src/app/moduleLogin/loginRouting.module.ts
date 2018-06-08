import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainLoginComponent } from './components/mainLogin/mainLogin.component';

const loginRoutes: Routes = [
    {
        path: 'login-panel',
        component: MainLoginComponent,
        children: [
            { path: '', redirectTo: 'inicioSesion', pathMatch: 'full' },
            { path: 'inicioSesion', component: LoginComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule{
    
}