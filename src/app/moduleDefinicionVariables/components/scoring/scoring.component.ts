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
import { variable, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { all } from 'q';
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

  public title = 'Aritmética';
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
  public crearNueva() {
    //this.editando = !this.editando;
    this.action = 'ARITMÉTICA';
    this.nombreVariable = '';
    this.exp = [];
    this.id_variable = 0;
    this.if_station = 0;
    this.editando = false;
  }

  // start Metodo Messages
  private showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // end Metodo Messages

  ngOnInit() {
    let auth = localStorage.getItem('auth');
    if (!auth) return this._router.navigate(['/login-panel/inicioSesion']);

    this.loadVariables();
    this.loadVariables2();
  }

  private add_young_vars() {
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

    this.listVariables.push({
      active: true,
      id: -9,
      is_ok: null,
      name: "Monto solicitado",
      rango: "0-0",
      var_array: null,
      var_fix_id: -9
    });

  }

  private loadVariables() {
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

  private loadVariables2() {
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
  public add(event: MatChipInputEvent): void {
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
    if (input) input.value = '';

  }

  public remove(item: any): void {
    if (item.name == 'IF' && item.id == -1000) return;
    if (item.name == 'THEN' && item.id == -1000) this.if_station = 1;
    if (item.name == 'ELSE' && item.id == -1000) this.if_station = 2;
    if (item.name == 'END IF' && item.id == -1000) this.if_station = 3;
    let index = this.exp.indexOf(item);
    if (index >= 0) this.exp.splice(index, 1);
  }
  //end



  public minimo() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'MÍNIMO';
  }

  public maximo() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'MÁXIMO';
  }

  public promedio() {
    this.exp = [];
    this.action = this.blockOperators() ? 'ARITMÉTICA' : 'PROMEDIO';
  }

  public if_station = 0;
  public sii() {
    this.exp = [];
    this.action = this.action == 'IF' ? 'ARITMÉTICA' : 'IF';
    this.if_station = 0;
    if (this.action == 'ARITMÉTICA') return;
    this.if_station = 1;
    this.exp.push({ value: 'IF', id: -1000, name: 'IF' });
  }

  public then() {

    if (this.exp.length == 1 && this.exp[0].value == 'IF') this.exp.push({ value: true, id: -1000, name: 'TRUE' });
    this.exp.push({ value: 'THEN', id: -1000, name: 'THEN' });
    this.if_station = 2;

  }

  public _else() {
    this.exp.push({ value: 'ELSE', id: -1000, name: 'ELSE' });
    this.if_station = 3;
  }

  public endIf() {
    this.exp.push({ value: 'END IF', id: -1000, name: 'END IF' });
    this.if_station = 0;
  }

  public blockOperators(): boolean {
    return this.action == 'MÍNIMO' || this.action == 'PROMEDIO' || this.action == 'MÁXIMO';
  }

  public addOperator(operator: any) {
    if (operator == false) return this.exp = [];
    if (this.changingVariable) {
      if (String(operator) == 'sqrt' || String(operator) == '^') {
        this.exp = [
          ...this.exp.slice(0, this.positionToChange),
          { value: operator, id: -1000, name: operator },
          { value: '(', id: -1000, name: '(' },
          ...this.exp.slice(this.positionToChange + 1)
        ];
        this.changingVariable = null;
        this.positionToChange = null;
        return;
      }
      this.exp = [
        ...this.exp.slice(0, this.positionToChange),
        { value: operator, id: -1000, name: operator },
        ...this.exp.slice(this.positionToChange + 1)
      ];
      this.changingVariable = null;
      this.positionToChange = null;
      return;
    }
    this.exp.push({ value: operator, id: -1000, name: operator });

    if (String(operator) == 'sqrt' || String(operator) == '^') this.exp.push({ value: '(', id: -1000, name: '(' });
  }


  public addDigint(num: string) {
    if (this.changingVariable == null) {
      if (this.exp.length == 0) {
        this.exp.push({ value: num, id: 0, name: num });
        return;
      }
      let last_number = this.exp[this.exp.length - 1].name;
      if (isNaN(Number(last_number))) {
        this.exp = [...this.exp, { value: num, id: 0, name: num }];
        // this.exp.push({ value: num, id: 0, name: num });
        return;
      }
      this.exp.splice(this.exp.length - 1, 1);
      this.exp.push({ value: last_number + num, id: 0, name: last_number + num });
    } else {
      if (this.exp.length == 0) {
        this.exp = [
          ...this.exp.slice(0, this.positionToChange),
          { value: num, id: 0, name: num },
          ...this.exp.slice(this.positionToChange + 1)
        ];
        // this.changingVariable = null;
        // this.positionToChange = null;
        return;
      }
      let last_number = this.exp[this.positionToChange].name;
      if (isNaN(Number(last_number))) {
        this.exp = [
          ...this.exp.slice(0, this.positionToChange),
          { value: num, id: 0, name: num },
          ...this.exp.slice(this.positionToChange + 1)
        ];
        // this.exp.push({ value: num, id: 0, name: num });
        return;
      }

      this.exp = [
        ...this.exp.slice(0, this.positionToChange),
        { value: last_number + num, id: 0, name: last_number + num },
        ...this.exp.slice(this.positionToChange + 1)
      ];
      // this.exp.splice(this.exp.length - 1, 1);
      // this.exp.push({ value: last_number + num, id: 0, name: last_number + num });
    }
  }

  public getColor(name: string) {
    let exp = new RegExp(/((\+)|(-)|(\/)|(X)|(sqrt)|(\()|(\))|(if)|(then)|(else)|(\<)|(\>)|(\!)|(prom)|(min)|(max)|(\^)|(\=))/i);
    if (exp.test(name)) {
      return 1;
    }
    return 2;
  }


  public clean() {
    this.exp = [];
    if (this.action == 'IF') {
      this.if_station = 1;
      this.exp.push({ value: 'IF', id: -1000, name: 'IF' });
    }
  }

  public addItem(value: any, default_variable: boolean) {
    value.id2 = default_variable ? 'd' + value.id : 'c' + value.id;
    if (this.changingVariable) {
      this.exp = [
        ...this.exp.slice(0, this.positionToChange),
        value,
        ...this.exp.slice(this.positionToChange + 1)
      ];
      this.changingVariable = null;
      this.positionToChange = null;
      return;
    }
    this.exp.push(value);
  }

  public variable_editing: any;
  public objToEdit: any = null;
  public editVariable = variableToEdit => {
    this.changingVariable = null;
    this.positionToChange = null;

    this.objToEdit = variableToEdit;
    this.editando = this.editando ? this.editando : !this.editando;
    this.variable_editing = variableToEdit;
    this.id_variable = variableToEdit.id;
    this.nombreVariable = variableToEdit.name;
    let maximo = new RegExp(/MÁXIMO!/i),
      promedio = new RegExp(/promedio!/i),
      minimo = new RegExp(/MÍNIMO!/i),
      _if = new RegExp(/^IF/);

    let first_list = [], endList = [];
    this.clean();
    if (maximo.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(maximo, '').replace(/_$/, '').split('_');
      this.action = 'MÁXIMO';
    }
    else if (minimo.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(minimo, '').replace(/_$/, '').split('_');
      this.action = 'MÍNIMO';
    }
    else if (promedio.test(String(variableToEdit.expresion))) {
      first_list = String(variableToEdit.expresion).replace(promedio, '').replace(/_$/, '').split('_');
      this.action = 'PROMEDIO';
    }
    else if (_if.test(String(variableToEdit.expresion))) {
      this.action = 'IF';
      this.if_station = 0;
      this.exp = [];
      first_list = variableToEdit.expresion.split('||');
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
    this.exp = [...endList];
  }

  public deleteVariable = () => {

    for (let index = 0; index < this.listVariables2.length; index++) {
      const variable = this.listVariables2[index];
      if (variable.expresion.includes('c' + this.variable_editing.id)) {
        this.showMessage('Fórmula necesaria para otro cálculo', 'ENTENDIDO');
        return;
      }
    }
    this._DefinicionVariablesService.delete_a_custom_variable(this.variable_editing.id).subscribe(
      resp => {
        this.loadVariables2();
        this.crearNueva()
        if (resp.status == 5000) this.showMessage('Fórmula necesaria en el árbol !', 'ENTENDIDO');
      },
      error => {
        this.showMessage(error, 'ERROR');
      }
    );
  }

  private valdiateSintaxExpression = (expression: string) => {
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
    if (rule4.test(expression)) return 'Bad expression';
    if (rule5.test(expression)) return 'Bad expression';
    if (rule6.test(expression)) return 'Bad expression';

    return expression;
  }

  private resolveExpretion() {
    let allExp: string = '';
    this.exp.forEach((element, index) => {
      // guarda variables
      if (element.id > 0) {  // variable
        allExp += index == 0 ? element.id2 : '||' + element.id2;
      } else if (element.id == 0) { // number
        allExp += index == 0 ? element.name : '||' + element.name;
      } else if (element.id == -1000) {  //operator
        allExp += index == 0 ? element.name : '||' + element.name;
      }
      else if (element.id < 0 && element.id > -1000) {  // YOUNG VARIABLE
        allExp += index == 0 ? element.id2 : '||' + element.id2;
      }
    });
    return allExp;
  }

  private resolveMinimo() {
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
    return allExp;
  }

  private resolveMaximo() {
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
    return allExp;
  }

  private resolvePromedio() {
    let correcto = true;
    let allExp: string = this.action + '!';
    this.exp.forEach((element, index) => {
      if (element.id == -1000) {  // operator
        correcto = false;
      } else if (element.id > 0) {  // variable
        allExp += element.id2 + '_';
      } else if (element.id == 0) { // number
        allExp += element.name + '_';
      } else if (element.id < 0 && element.id > -1000) {  // YOUNG
        allExp += index == 0 ? element.id2 : '_' + element.id2;
      }
    });
    return allExp;
  }

  private resolveIF() {
    let allExp: string = '', expTemp: string = '';
    let operadorLogico = new RegExp(/((\<)|(\>)|(\={2})|(\!\=))/);
    allExp = this.resolveExpretion();

    return allExp;
  }

  public moveLeft() {
    let itemToMove = this.exp[this.positionToChange];
    let itemToMove2 = this.exp[this.positionToChange - 1];
    let listTemp = this.exp;
    this.exp = [
      ...listTemp.slice(0, this.positionToChange - 1),
      itemToMove,
      itemToMove2,
      ...listTemp.slice(this.positionToChange + 1)
    ];
    this.positionToChange = null;
  }

  public moveRight() {
    let itemToMove = this.exp[this.positionToChange];
    let itemToMove2 = this.exp[this.positionToChange + 1];
    let listTemp = this.exp;
    this.exp = [
      ...listTemp.slice(0, this.positionToChange),
      itemToMove2,
      itemToMove,
      ...listTemp.slice(this.positionToChange + 2)
    ];
    this.positionToChange = null;
  }

  public selectedVariable(index: number) {
    return this.positionToChange == index && this.changingVariable;
  }

  public changingVariable = null;
  public positionToChange: number = null;
  public changeVariable() {
    this.changingVariable = true;
    let last_number = this.exp[this.positionToChange].name;
    let valor = parseInt(last_number);
    if (!isNaN(Number(valor))) {
      this.exp[this.positionToChange].name = '';
    }
  }
  //ok

  public changeItem(index: number) {
    this.changingVariable = null;
    this.positionToChange = index;
  }


  public create() {
    if (this.exp.length == 0) return;
    if (this.action == 'ARITMÉTICA') {
      let allExp = this.valdiateSintaxExpression(this.resolveExpretion());
      if (allExp == 'Bad expression') {
        this.showMessage(allExp, 'Ocultar mensaje');
        return;
      }
      let varToExp: VarToExp = new VarToExp(allExp, this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();
          }

          else this.showMessage('Ocurrió un problema al salvar aritmética', 'Ocultar mensaje');

          this.id_variable = 0;

          this.editando = false;
        },
        err => {
          this.showMessage('Ocurrió un problema al salvar aritmética, verificar conexión', 'Ocultar mensaje');
        }
      );
    }
    else if (this.action == 'MÁXIMO') {

      let varToExp: VarToExp = new VarToExp(this.resolveMaximo(), this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();

            this.editando = false;
          }
          else this.showMessage('Ocurrió un problema al salvar MÁXIMO', 'Ocultar mensaje');
        },
        err => {
          this.showMessage('Ocurrió un problema al salvar MÁXIMO, verificar conexión', 'Ocultar mensaje');
        }
      );
    }
    else if (this.action == 'MÍNIMO') {
      let varToExp: VarToExp = new VarToExp(this.resolveMinimo(), this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();

            this.editando = false;
          }
          else this.showMessage('Ocurrió un problema al salvar MÍNIMO', 'Ocultar mensaje');
        },
        err => {
          this.showMessage('Ocurrió un problema al salvar MÍNIMO, verificar conexión', 'Ocultar mensaje');
        }
      );
    }
    else if (this.action == 'PROMEDIO') {
      let varToExp: VarToExp = new VarToExp(this.resolvePromedio(), this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();

            this.editando = false;
          }

          else this.showMessage('Ocurrió un problema al salvar PROMEDIO', 'Ocultar mensaje');

        },
        err => {
          this.showMessage('Ocurrió un problema al salvar PROMEDIO, verificar conexión', 'Ocultar mensaje');
        }
      );
    }
    else if (this.action == 'IF') {
      let allExp: string = '', expTemp: string = '';
      let correctIF = new RegExp(/^IF.{3,}((\>)|(\<)|(\={2})|(\!\=)).{3,}(THEN).{3,}(ELSE).{3,}(END\sIF)$/);
      let expresion = this.resolveExpretion();
      if (!correctIF.test(expresion))
        return this.showMessage('Sintaxis incorrecta', 'Ocultar mensaje');
      let varToExp: VarToExp = new VarToExp(expresion, this.id_variable, this.nombreVariable);
      this._DefinicionVariablesService.setABankCustomVariable(varToExp).subscribe(
        resp => {
          if (resp.status == 0 && resp.message == 'successful') {
            this.nombreVariable = '';
            this.exp = [];
            this.loadVariables2();

            this.editando = false;
          }

          else this.showMessage('Ocurrió un problema al salvar aritmética', 'Ocultar mensaje');

          this.id_variable = 0;
        },
        err => {
          this.showMessage('Ocurrió un problema al salvar aritmética, verificar conexión', 'Ocultar mensaje');
        }
      );
    }

  }

}

