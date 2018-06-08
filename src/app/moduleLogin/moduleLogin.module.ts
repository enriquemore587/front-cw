/** IPMORTO TODOS LOS MODULOS NECESARIOS PARA CREAR UN MODULO */
import {  NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { UserLoginService } from './services/user-login.service';

import { LoginRoutingModule } from './loginRouting.module';

/** IMPORTO TODOS LOS COMPONENTES DE ESTE MODULE  */
import { LoginComponent } from './components/login/login.component';
import { MainLoginComponent } from './components/mainLogin/mainLogin.component';

import {SourceMaterialModule} from '../material/app.material';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
    imports: [CommonModule, FormsModule, LoginRoutingModule, HttpModule, SourceMaterialModule],
    declarations: [
        MainLoginComponent,
        LoginComponent,
        MenuComponent
    ],
    exports: [/** ESTO SE PUEDE HACER SI SEVA HA HACER USO DE ALGÚN COMPONENTE EN ESPESIFICO EN ESTE CASO NO SE HARA PERO NO AFECTA EL HACERLO */
        MainLoginComponent,
        LoginComponent,
        SourceMaterialModule,
        HttpClientModule,
        MenuComponent
    ],
    providers: [UserLoginService]
})
export class ModuloLogin {
    
}
