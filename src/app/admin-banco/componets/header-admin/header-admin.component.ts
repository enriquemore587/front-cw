import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  public imagePath = environment.logoName;
  constructor(
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  logOut() {
    this._router.navigate(['/login-panel']);
    localStorage.clear();
  }
}
