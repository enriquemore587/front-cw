import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: MainAdminComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: MainAdminComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}
