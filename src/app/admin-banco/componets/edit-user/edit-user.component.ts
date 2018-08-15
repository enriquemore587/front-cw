import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserItem } from '../../models/UserItem';
import { EditUserService } from '../../services/edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [EditUserService]
})
export class EditUserComponent implements OnInit {
  public _UserItem: UserItem;
  constructor(
    public _Router: Router,
    public _EditUserService: EditUserService
  ) { }


  ngOnInit() {
  }

}
