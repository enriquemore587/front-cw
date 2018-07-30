import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'header-formaliza',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public imagePath = environment.logoName;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    this._router.navigate(['/login-panel']);
    localStorage.clear();
  }
}
