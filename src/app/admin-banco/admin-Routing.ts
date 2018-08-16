import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { HeaderAdminComponent } from './componets/header-admin/header-admin.component';
import { MainComponent } from './componets/main/main.component';
import { BusquedaUsuariosComponent } from './componets/busqueda-usuarios/busqueda-usuarios.component';
import { EditUserComponent } from './componets/edit-user/edit-user.component';
import { NewUserComponent } from './componets/new-user/new-user.component';
import { BitacoraUsuariosComponent } from './componets/bitacora-usuarios/bitacora-usuarios.component';

const AdminRoutingRoutes : Routes = [
    {
        path: 'admin-panel',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'busqueda-usuarios', pathMatch: 'full' },
            { path: 'busqueda-usuarios', component: BusquedaUsuariosComponent },
            { path: 'edit-user', component: EditUserComponent },
            { path: 'new-user', component: NewUserComponent },
            { path: 'bitacora-usuarios', component: BitacoraUsuariosComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule{
    
}