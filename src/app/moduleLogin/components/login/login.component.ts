import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

import { UserLoginService } from '../../services/user-login.service';

import { Router } from '@angular/router';

// begin message
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';
// end message

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserLoginService]
})
export class LoginComponent implements OnInit {
  public title: string = 'INICIO SESIÓN';
  public user: User;
  public imagePath = environment.logo;

  hide = false;
  constructor(
    private _router: Router,
    private _UserLoginService: UserLoginService,
    public snackBar: MatSnackBar  // messages
  ) {
    this.user = new User('', '');
  }
  // start Metodo Messages
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages
  ngOnInit() {
    let auth = localStorage.getItem('auth');
    let name_profile = this._UserLoginService.getName_profile();
    if (auth && name_profile == 'USUARIO BANCO') this._router.navigate(['/definicion-variables/activacion-variables-cliente']);
    else if (auth && name_profile == 'EJECUTIVO BANCO') this._router.navigate(['/formaliza']);
    else if (auth && name_profile == 'DIRECTIVO DE BANCO') this._router.navigate(['/director-panel']);
  }

  onSubmit(registerForm) {
    this._UserLoginService.login(this.user).subscribe(
      resp => {
        if (resp.status == 0) {
          registerForm.reset();
          // guardo el tipo de perfil
          localStorage.setItem('name_profile', resp.data.name_profile);
          localStorage.setItem('auth', resp.data.token);
          localStorage.setItem('nombre_usuario', resp.data.nombre_usuario);
          localStorage.setItem('menu', JSON.stringify(resp.data.menu));
          if (resp.data.name_profile == 'USUARIO BANCO') {
            this._router.navigate(['/definicion-variables/activacion-variables-cliente']);
          }
          else if (resp.data.name_profile == 'EJECUTIVO BANCO') {
            this._router.navigate(['/formaliza']);
          }
          else if (resp.data.name_profile == 'DIRECTIVO DE BANCO') this._router.navigate(['/director-panel']);
        } else {
          this.user.pwd = '';
          this.showMessage('Usuario/contraseña incorrectos', 'Ocultar mensaje');
        }
      },
      err => {
        this.showMessage('Ocurrió un problema al iniciar sesión', 'Ocultar mensaje');
      }
    );
  }

}
