import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { AdminRoutingModule } from './AdminRouting.module';
import { UsersListComponent } from './components/users-list/users-list.component';

import { SourceMaterialModule } from '../material/app.material';
import { UserListService } from './services/user-list.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SourceMaterialModule
  ],
  declarations: [
    MainAdminComponent,
    UsersListComponent
  ],
  exports: [
    MainAdminComponent
  ],
  providers: [
    UserListService
  ]
})
export class AdminOneModule { }
