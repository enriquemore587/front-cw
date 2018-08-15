import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../../services/new-user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [NewUserService]
})
export class NewUserComponent implements OnInit {

  constructor(
    public _NewUserService: NewUserService
  ) { }

  ngOnInit() {
  }

}
