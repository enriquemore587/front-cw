import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { log } from 'util';

import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { VariableIndicador } from '../../models/variableIndicador';
import { ResponseVI } from '../../models/responseVI';
import { and } from '@angular/router/src/utils/collection';
import { ItemCheck } from '../../models/requestCheck';
import { VarToExp } from '../../models/varToExp';

//start
//end

//start

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { elementAt } from 'rxjs/operators';
//end

// begin message
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
// end message


@Component({
  selector: 'scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css'],
  providers: [DefinicionVariablesService]
})
export class ScoringComponent implements OnInit {
  //start
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  public exp: any[] = [];


  //end

  public title = 'SCORING';
  public action: string = 'ARITMÉTICA';
  public nombreVariable: string = '';

  public listVariables: any[] = [];
  public listVariables2: any[] = [];
  public id_variable = 0;

  public color: string;



  constructor(
    private _router: Router,
    private _DefinicionVariablesService: DefinicionVariablesService,
    public snackBar: MatSnackBar  // messages
  ) {

  }
  public editando = false;
  crearNueva() {
    this.editando = !this.editando;
    this.action = 'ARITMÉTICA';
    this.nombreVariable = '';
    this.exp = [];
    this.id_variable = 0;
  }

  // start Metodo Messages
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages

  setCheck(obj: any) {

  }

  ngOnInit() {
    this.loadVariables();
    this.loadVariables2();
  }

  add_young_vars() {
    this.listVariables.push({
      active: true,
      id: -3,
      is_ok: null,
      name: "Pagos buró",
      rango: "0-0",
      var_array: null,
      var_fix_id: -3
    });

    this.listVariables.push({
      active: true,
      id: -7,
      is_ok: null,
      name: "Plazo solicitado",
      rango: "0-0",
      var_array: null,
      var_fix_id: -7
    });

    this.listVariables.push({
      active: true,
      id: -8,
      is_ok: null,
      name: "Plazo disponible",
      rango: "0-0",
      var_array: null,
      var_fix_id: -8
    });

  }

  loadVariables() {
    this.listVariables = [];
    this._DefinicionVariablesService.getAllVarsBanco().subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful') {
          this.listVariables = resp.data;
          this.add_young_vars();
        }
        else console.log(resp);
      }
    );
  }

  loadVariables2() {
    this.listVariables2 = [];
    this._DefinicionVariablesService.getAllCustomVarsBanco().subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful') {
          resp.data.forEach(element => {
            element.cat = true;
            this.listVariables2.push(element);
          });
        }
        else console.log(resp);
      }
    );

  }

  //start
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let operadores = new RegExp(/((X)|(\/)|(-)|(\+)|(\*)|(sqrt)|(\^)|(\()|(\)))/);
      if (new RegExp(/\d+/).test(value)) {
        value = value.match(new RegExp(/\d+/))[0];
        this.exp.push({ value: value, id: 0, name: value });
      } else if (operadores.test(value)) {
        value = value.match(operadores)[0];


        this.exp.push({ value: value, id: -1000, name: value });
        if (String(value) == 'sqrt' || String(value) == '^')
          this.exp.push({ value: '(', id: -1000, name: '(' });

      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.exp.indexOf(fruit);

    if (index >= 0) {
      this.exp.splice(index, 1);
    }
  }
  //end



  minimo() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'MÍNIMO';
  }

  maximo() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'MÁXIMO';
  }

  promedio() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'PROMEDIO';
  }

  blockOperators(): boolean {
    return this.numero != '' || this.action == 'MÍNIMO' || this.action == 'PROMEDIO' || this.action == 'MÁXIMO';
  }

  addOperator(operator: any) {
    if (operator == false) return this.exp = [];
    this.exp.push({ value: operator, id: -1000, name: operator });
    if (String(operator) == 'sqrt' || String(operator) == '^')
      this.exp.push({ value: '(', id: -1000, name: '(' });
  }

  public numero: string = '';
  addDigint(num: string) {
    this.numero += num;
  }

  addNumber() {
    this.exp.push({ value: this.numero, id: 0, name: this.numero });
    this.numero = '';
  }

  clean() {
    this.exp = [];
    this.numero = '';
  }

  addItem(value: any, default_variable: boolean) {
    value.id2 = default_variable ? 'd' + value.id : 'c' + value.id;
    this.exp.push(value);
  }

  editVariable = variableToEdit => {

    this.editando = !this.editando;

    this.id_variable = variableToEdit.id;
    this.nombreVariable = variableToEdit.name;
    let maximo = new RegExp(/MÁXIMO!/i),
      promedio = new RegExp(/promedio!/i),
      minimo = new RegExp(/MÍNIMO!/i);

    let first_list = [], endList = [];
    this.clean();
    if (maximo.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(maximo, '').replace(/_$/, '').split('_');
      this.maximo();
    }
    else if (minimo.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(minimo, '').replace(/_$/, '').split('_');
      this.minimo();
    }
    else if (promedio.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(promedio, '').replace(/_$/, '').split('_');
      this.promedio();
    }
    else {
      this.action = 'ARITMÉTICA';
      this.exp = [];
      first_list = variableToEdit.expresion.split('||');
    }

    for (let index1 = 0; index1 < first_list.length; index1++) {
      var item = first_list[index1];
      let containsDefaultVariable = new RegExp(/d\d+/), // para default variables
        containsCustomVariable = new RegExp(/c\d+/),    // para custom variables
        containsYoungVariable = new RegExp(/d\-\d/);    // para young variables
      if (containsDefaultVariable.test(String(item))) {
        let id = String(item).match(containsDefaultVariable)[0].replace('d', '');
        for (let index2 = 0; index2 < this.listVariables.length; index2++) {
          var variableTemp = this.listVariables[index2];
          if (variableTemp.id == id) {
            variableTemp.id2 = 'd' + id;
            endList.push(variableTemp);
          }
        }
      } else if (containsYoungVariable.test(String(item))) {
        let id = String(item).match(containsYoungVariable)[0].replace('d', '');
        for (let index2 = 0; index2 < this.listVariables.length; index2++) {
          var variableTemp = this.listVariables[index2];
          if (variableTemp.id == id) {
            variableTemp.id2 = 'd' + id;
            endList.push(variableTemp);
          }
        }
      }
      else if (containsCustomVariable.test(String(item))) {
        let id = String(item).match(containsCustomVariable)[0].replace('c', '');
        for (let index2 = 0; index2 < this.listVariables2.length; index2++) {
          var variableTemp = this.listVariables2[index2];
          if (variableTemp.id == id) {
            variableTemp.id2 = 'c' + id;
            endList.push(variableTemp);
          }
        }
      }
      else {
        if (typeof item === "number") endList.push({ name: item, id: 0 });
        else endList.push({ name: item, id: -1000 });
      }
    }
    this.exp = endList;
  }

  deleteVariable = itemToDelete => {
    for (let index = 0; index < this.listVariables2.length; index++) {
      const variable = this.listVariables2[index];
      if (variable.expresion.includes('c' + itemToDelete.id)) {
        this.showMessage('Fórmula necesaria para otro cálculo', 'ENTENDIDO');
        return;
      }
    }
    this._DefinicionVariablesService.delete_a_custom_variable(itemToDelete.id).subscribe(
      resp => {
        this.loadVariables2();
        if (resp.status == 5000) this.showMessage('Fórmula necesaria en el árbol !', 'ENTENDIDO');
      },
      error => {
        this.showMessage(error, 'ERROR');
      }
    );
  }

  valdiateSintaxExpression = (expression: string) => {
    let rule1 = new RegExp(/^[\+\-\X\/\^]/),  // se válida que no comience de manera equivocada
      rule2 = new RegExp(/\(/g),  // se detectan paréntesis izq.
      rule3 = new RegExp(/\)/g),  // se detectan paréntesis der.
      rule4 = new RegExp(/(((d\d+)|(c\d+)|(\d+))\|\|((d)|(c)|(\d)))/i), // se detectan dos variables, números o variables y números continuos
      rule5 = new RegExp(/((\+)|(\-)|(\X)|(\/)|(\^)|(sqrt))\|\|((\+)|(\-)|(\X)|(\/)|(\^)|(sqrt))/gi),// detectar operadores continuos
      rule6 = new RegExp(/((\+)|(\-)|(\X)|(\/)|(\^)|(sqrt))$/);
    if (rule1.test(expression))
      return 'Bad expression';
    if (rule2.test(expression)) {
      if (rule3.test(expression)) {
        if (expression.match(rule2).length != expression.match(rule3).length)
          return 'Bad expression';
      }
      else return 'Bad expression';
    }
    if (rule4.test(expression))
      return 'Bad expression';
    if (rule5.test(expression))
      return 'Bad expression';
    if (rule6.test(expression))
      return 'Bad expression';


    return expression;
  }

  create() {
    if (this.exp.length == 0) return;
    if (this.action == 'ARITMÉTICA') {
      let allExp: string = '';
      this.exp.forEach((element, index) => {
        // guarda variables
        if (element.id > 0) {  // variable
          allExp += index == 0 ? element.id2 : '||' + element.id2;
          //allExp += element.id2; antes
        } else if (element.id == 0) { // number
          allExp += index == 0 ? element.name : '||' + element.name;
          // allExp += element.value; antes
        } else if (element.id == -1000) {  //operator
          allExp += index == 0 ? element.name : '||' + element.name;
          //  allExp += element.value; antes
        }
        else if (element.id < 0 && element.id > -1000) {  //operator
          allExp += index == 0 ? element.id2 : '||' + element.id2;
          //  allExp += element.value; antes
        }
      });

      allExp = this.valdiateSintaxExpression(allExp);
      if (allExp == 'Bad expression') {
        this.showMessage(allExp, 'OK');
        return;
      }

      let varToExp: VarToExp = new VarToExp(allExp, this.id_variable, this.nombreVariable);

      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();
          } else console.log("somethink bad");
          this.id_variable = 0;
        },
        err => {
          console.log("error", err);
        }
      );
    }
    else if (this.action == 'MÁXIMO') {
      let correcto = true;
      let allExp: string = this.action + '!';
      this.exp.forEach((element, index) => {
        if (element.id == -1000) {  // operator
          correcto = false;
        } else if (element.id > 0) {  // variable
          allExp += element.id2 + '_';
        } else if (element.id == 0) { // number
          allExp += element.name + '_';
        }
        else if (element.id < 0 && element.id > -1000) {  //operator
          allExp += index == 0 ? element.id2 : '_' + element.id2;
        }

      });
      let varToExp: VarToExp = new VarToExp(allExp, this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();
          } else console.log("somethink bad");

        },
        err => {
          console.log("error", err);
        }
      );
    }
    else if (this.action == 'MÍNIMO') {
      let correcto = true;
      let allExp: string = this.action + '!';
      this.exp.forEach((element, index) => {
        if (element.id == -1000) {  // operator
          correcto = false;
        } else if (element.id > 0) {  // variable
          allExp += element.id2 + '_';
        } else if (element.id == 0) { // number
          allExp += element.name + '_';
        } else if (element.id < 0 && element.id > -1000) {  //operator
          allExp += index == 0 ? element.id2 : '_' + element.id2;
        }
      });

      let varToExp: VarToExp = new VarToExp(allExp, this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();
          } else console.log("something bad", resp);
        },
        err => {
          console.log("error", err);
        }
      );
    }
    else if (this.action == 'PROMEDIO') {
      let correcto = true;
      let allExp: string = this.action + '!';
      this.exp.forEach((element, index) => {
        if (element.id == -1000) {  // operator
          correcto = false;
        } else if (element.id > 0) {  // variable
          allExp += element.id2 + '_';
        } else if (element.id == 0) { // number
          allExp += element.name + '_';
        } else if (element.id < 0 && element.id > -1000) {  //operator
          allExp += index == 0 ? element.id2 : '_' + element.id2;
        }
      });
      let varToExp: VarToExp = new VarToExp(allExp, this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();
          }
          else console.log("somethink bad");
        },
        err => {
          console.log("error", err);
        }
      );
    }

  }

}

