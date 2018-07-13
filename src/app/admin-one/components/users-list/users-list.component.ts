import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserListService]
})
export class UsersListComponent implements OnInit {
  
  public step : number = 0;

  constructor(
    public _UserListService: UserListService
  ) {
    this.step = 0;
  }

  ngOnInit() {
  }


  public setStep(index: number) {
    this._UserListService.getGeneralPersonalData(this._UserListService.userList[index].id);
    this._UserListService.getLocationsByUserSuccess(this._UserListService.userList[index].id, true);
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  public okk(){
    console.log(1);
    
  }

}
