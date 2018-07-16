import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { AdminRoutingModule } from './AdminRouting.module';
import { UsersListComponent, ShowImageDialog } from './components/users-list/users-list.component';

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
    UsersListComponent,
    ShowImageDialog
  ],
  exports: [
    MainAdminComponent
  ],
  providers: [
    UserListService
  ],
  entryComponents:[ShowImageDialog]
})
export class AdminOneModule { }
