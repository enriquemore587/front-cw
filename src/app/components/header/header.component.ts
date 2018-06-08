import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserLoginService } from '../../moduleLogin/services/user-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck{
  public title: string = 'Bancos';
  public auth;
  public email;
  

  constructor(
    private _router: Router,
    private _UserLoginService : UserLoginService
  ) {
  }

  ngOnInit(){
    this.auth = this._UserLoginService.getAuth();
    this.email = localStorage.getItem('email');
    this._router.navigate(['/']);
  }

  ngDoCheck(){
    this.auth = this._UserLoginService.getAuth();
    this.email = localStorage.getItem('email');
  }

  logOut() {
    this._router.navigate(['/']);
    localStorage.clear();
  }
}

