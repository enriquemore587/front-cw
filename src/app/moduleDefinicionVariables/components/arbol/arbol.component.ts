import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { log } from 'util';

import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { VariableIndicador } from '../../models/variableIndicador';
import { ResponseVI } from '../../models/responseVI';
import { and } from '@angular/router/src/utils/collection';
import { ItemCheck } from '../../models/requestCheck';

// begin message
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
// end message

@Component({
  selector: 'arbol-component',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css'],
  providers: [DefinicionVariablesService]
})
export class ArbolComponent implements OnInit {

  public title = 'ÁRBOL';

  constructor(
    private _router: Router,
    private _DefinicionVariablesService: DefinicionVariablesService,
    public snackBar: MatSnackBar  // messages
  ) {

  }
  
  // start Metodo Messages
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages

  public listVariables: any = [];
  public listVariables2: any = [];
  public orderList: any = [];

  public salidas: any = {
    mensualidad: { checked: false, id: 1, index: -1 },
    plazo: { checked: false, id: 2, index: -1 },
    linea_credito: { checked: false, id: 3, index: -1 },
    tasa: { checked: false, id: 4, index: -1 }
  };

  disableSelect() {
    return this.salidas.mensualidad.checked && this.salidas.linea_credito.checked && this.salidas.plazo.checked && this.salidas.tasa.checked;
  }

  getbuttonsPermitions(sort) {
    return sort > 11;
  }

  cambio(type) {
    if (type == 1) {
      this.orderList[this.salidas.mensualidad.index].salida = 0;
      this.salidas.mensualidad.index = -1;
      console.log(this.orderList[this.salidas.mensualidad.index]);
    } else if (type == 2) {
      this.orderList[this.salidas.plazo.index].salida = 0;
      this.salidas.plazo.index = -1;
      console.log(this.orderList[this.salidas.plazo.index]);
    } else if (type == 3) {
      this.orderList[this.salidas.linea_credito.index].salida = 0;
      this.salidas.linea_credito.index = -1;
      console.log(this.orderList[this.salidas.linea_credito.index]);
    }
    else if (type == 4) {
      this.orderList[this.salidas.tasa.index].salida = 0;
      this.salidas.tasa.index = -1;
      console.log(this.orderList[this.salidas.tasa.index]);
    }

  }

  doSomething(event, index) {
    if (event.value == 1) {
      this.salidas.mensualidad.checked = true;
      this.salidas.mensualidad.index = index;
    } else if (event.value == 2) {
      this.salidas.plazo.checked = true;
      this.salidas.plazo.index = index;
    }
    else if (event.value == 3) {
      this.salidas.linea_credito.checked = true;
      this.salidas.linea_credito.index = index;
    }
    else if (event.value == 4) {
      this.salidas.tasa.checked = true;
      this.salidas.tasa.index = index;
    }
  }

  loadVariables() {
    this.listVariables = [];
    this._DefinicionVariablesService.getOrderDefaultVariablesByBank().subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful') {
          this.orderList = resp.data;
          this.orderList.forEach((element, index) => {
            if (element.salida > 0) {
              if (element.salida == 1) {
                this.salidas.mensualidad.checked = true;
                this.salidas.mensualidad.index = index;
              } else if (element.salida == 2) {
                this.salidas.plazo.checked = true;
                this.salidas.plazo.index = index;
              } else if (element.salida == 3) {
                this.salidas.linea_credito.checked = true;
                this.salidas.linea_credito.index = index;
              } else if (element.salida == 4) {
                this.salidas.tasa.checked = true;
                this.salidas.tasa.index = index;
              }
            }
          });
        }
      },
      error => {
        this.showMessage('Ocurrio un error en el orden de las variables', 'Entendido');
      }
    );
  }

  loadVariables2() {
    this._DefinicionVariablesService.getAllCustomVarsBanco().subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful') {
          resp.data.forEach(element => {
            element.cat = true;
            this.listVariables2.push(element);
          });
        }
      },
      error => {
        this.showMessage('Ocurrio un error en el listado de variables', 'Entendido');
      }
    );
  }

  clearTree() {
    this._DefinicionVariablesService.clear_tree().subscribe(
      resp => {
        if (resp.status != 0 || resp.message != 'successful') return this.showMessage('Ocurrio un problema al limpiar', 'Ok');
        this.loadVariables();
      },
      err => {
        this.showMessage('Ocurrio un problema', 'Ok');
      }
    );
  }

  saveChange() {
    if (this.salidas.mensualidad.index == -1)
      return this.showMessage('Falta - "salida de Mensualidad"', 'ENTENDIDO');
    else if (this.salidas.plazo.index == -1)
      return this.showMessage('Falta - "salida de Plazo"', 'ENTENDIDO');
   else if (this.salidas.linea_credito.index == -1)
      return this.showMessage('Falta - "salida de Linea Final"', 'ENTENDIDO');
   else if (this.salidas.tasa.index == -1)
      return this.showMessage('Falta - "salida de Tasa"', 'ENTENDIDO');
          
    let ids: any = {
      id_mensualidad: this.orderList[this.salidas.mensualidad.index].id,
      id_plazo: this.orderList[this.salidas.plazo.index].id,
      id_linea_credito: this.orderList[this.salidas.linea_credito.index].id,
      id_tasa: this.orderList[this.salidas.tasa.index].id
    };

    this._DefinicionVariablesService.set_variables_will_be_output(ids).subscribe(
      respuesta => {

        let listToSent: any[] = [];

        this.orderList.forEach((element, index) => {

          if (element.sort > 11) listToSent.push([0, element.id, index + 1]);
          else listToSent.push([element.id, 0, index + 1]);

        });

        if (this.orderList.length == 0) listToSent.push([0, 0, 0]);
        this._DefinicionVariablesService.setListBankCustomVariables({ ids: listToSent }).subscribe(
          resp => {

            if (resp.status == 0 && resp.message == 'successful') this.showMessage('Cambio hecho', 'Ok');

          },
          err => {
            this.showMessage('Ocurrio un problema', 'Ok');
          }
        );
      },
      end => {
        this.showMessage('Ha ocurrido un problema', 'Ok');
      }
    );
  }

  addVariable(item: any) {
    item.sort = this.orderList.length + 1;
    this.orderList.push(item);
  }

  removeVariable(item: any) {
    if (item.salida != 0) return this.showMessage('Imposible eliminar ya que tiene asiganada una variable !', 'Entendido');
    let index: number = this.orderList.indexOf(item);
    this.orderList.splice(index, 1);
  }

  ngOnInit() {
    this.loadVariables();
    this.loadVariables2();
  }

}

