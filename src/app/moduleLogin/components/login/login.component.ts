import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { GLOBAL } from '../../../services/global';

import { UserLoginService } from '../../services/user-login.service';

import { Router, ActivatedRoute, Params} from '@angular/router';

import { FormControl, Validators } from '@angular/forms';
import { ErrorForms } from '../../../material/ErrorsStateMatcher';
import { log } from 'util';
// begin message
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
// end message

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserLoginService ]
})
export class LoginComponent implements OnInit {
  public title : string = 'INICIO SESION';
  public user : User;
  

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  matcher = new ErrorForms();

  hide = false;
  constructor(
    private _router: Router,
    private _UserLoginService : UserLoginService,
    public snackBar: MatSnackBar  // messages
  ) { 
    this.user = new User('','');
  }
  // start Metodo Messages
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages
  ngOnInit() {
    
  }

  onSubmit(registerForm){
    this._UserLoginService.login(this.user).subscribe(
      resp => {
        if (resp.status == 0) {
          registerForm.reset();
          localStorage.setItem('auth', resp.data.token);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('menu', JSON.stringify(resp.data.menu));
          this._router.navigate(['/definicion-variables']);
        }else{
          this.showMessage('Usuario/contraseña incorrectos', 'Entendido');
        }
      },
      err => {
        this.showMessage('Ocurrio un problema al iniciar sesión', 'Entendido');
      }
    );
  }

}
