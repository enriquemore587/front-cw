import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-main-formaliza',
  templateUrl: './main-formaliza.component.html',
  styleUrls: ['./main-formaliza.component.scss']
})
export class MainFormalizaComponent implements OnInit {

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
