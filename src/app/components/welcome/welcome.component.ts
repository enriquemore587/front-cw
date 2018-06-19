import { Component, OnInit, DoCheck } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserLoginService } from '../../moduleLogin/services/user-login.service';
import { log } from 'util';

// begin message
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
// end message

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [UserLoginService]
})
export class WelcomeComponent implements OnInit {
  public title = 'CREDIWHERE';
  public auth;
  public buttons;

  constructor(
    private _router: Router,
    private _UserLoginService: UserLoginService,
    public snackBar: MatSnackBar  // messages
  ) {
  }

  ngOnInit() {
    this.auth = this._UserLoginService.getAuth();
    if (this.auth) this.getMenu();
  }


  // start Metodo Messages
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages

  getMenu() {
    this.buttons = JSON.parse(localStorage.getItem('menu'));
    this.buttons.forEach(element => {
      if (element.menu == 'DEFINICIÓN DE VARIABLES') {
        element.link = "definicion-variables";
      } else if (element.menu == 'TEST') {
        element.link = "pruebas";
      }else if (element.menu == 'TRACKING') {
        element.link = "tracking/consult";
      }
    })
  }

}
