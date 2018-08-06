import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-director-banco',
  templateUrl: './header-director-banco.component.html',
  styleUrls: ['./header-director-banco.component.scss']
})
export class HeaderDirectorBancoComponent implements OnInit {
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
