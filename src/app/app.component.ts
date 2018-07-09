import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserLoginService } from './moduleLogin/services/user-login.service';

import { log } from 'util';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'CREDIWHERE';
  public auth;
  public email;
  public imagePath = environment.logoName;


  constructor(
    private _router: Router,
    private _UserLoginService: UserLoginService
  ) {
  }

  ngOnInit() {
    this.auth = this._UserLoginService.getAuth();
    this.email = localStorage.getItem('email');
    this._router.navigate(['/']);
  }

  ngDoCheck() {
    this.auth = this._UserLoginService.getAuth();
    this.email = localStorage.getItem('email');
  }

  logOut() {
    this._router.navigate(['/login-panel']);
    localStorage.clear();
  }

}
