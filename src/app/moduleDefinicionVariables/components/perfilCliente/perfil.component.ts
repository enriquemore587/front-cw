import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { log } from 'util';

import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { VariableIndicador } from '../../models/variableIndicador';
import { ResponseVI } from '../../models/responseVI';
import { and } from '@angular/router/src/utils/collection';
import { ItemCheck } from '../../models/requestCheck';

/**BEGIN MESSAGE */
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
/**END MESSAGE */
@Component({
  selector: 'perfil-cliente',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [ DefinicionVariablesService ]
})
export class PerfilComponent implements OnInit{
  title = 'Perfil de cliente';
  public perfilList : VariableIndicador[];
  public responseVI : ResponseVI;
  public itemCheck : ItemCheck = new ItemCheck(0, false);
   

  constructor(
    private _router: Router,
    private _DefinicionVariablesService: DefinicionVariablesService,
    public snackBar : MatSnackBar // messages
  ){

  }

  showMessage(message: string, action : string){
    this.snackBar.open(message, action, {
      duration : 4000
    });
  }

  ngOnInit(){
    let auth = localStorage.getItem('auth');
    if (!auth) return this._router.navigate(['/login-panel/inicioSesion']);
    
    this.getVariablesClientes();
  }

  setCheck(obj: any){
    obj.status = !obj.status;
    
    this.itemCheck = new ItemCheck(obj.id, obj.status)
    this._DefinicionVariablesService.setChect(this.itemCheck).subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful') {
          this.getVariablesClientes();
        } else {
          obj.status = !obj.status;
          this.showMessage(`Status: ${String(resp.status)}`, "Ocultar mensaje");
        }
      },
      err => {
        console.log("error", err);
        this.showMessage(`Error: ${String(err)}`, "Ocultar mensaje");
      }
    );
  }

  getVariablesClientes(){
    this._DefinicionVariablesService.getVariablesClientes().subscribe(
      resp => {
        this.responseVI = resp;
        if (this.responseVI.status == 0 && this.responseVI.message == 'successful') this.perfilList = this.responseVI.data;
        else this.showMessage(`Status: ${String(resp.status)}`, "Ocultar mensaje");
      }
    );
  }

}

