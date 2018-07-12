import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserListService]
})
export class UsersListComponent implements OnInit {

  constructor(
    public _UserListService: UserListService
  ) {
  }

  ngOnInit() {
  }

  public step = 0;

  public setStep(index: number) {
    this._UserListService.getGeneralPersonalData(this._UserListService.userList[index].id);
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

}
