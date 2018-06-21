import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { log } from 'util';

import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { VariableIndicador } from '../../models/variableIndicador';
import { ResponseVI } from '../../models/responseVI';
import { and } from '@angular/router/src/utils/collection';
import { ItemCheck } from '../../models/requestCheck';

@Component({
  selector: 'indicadores-buro',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css'],
  providers: [DefinicionVariablesService]
})
export class IndicadoresComponent implements OnInit, DoCheck {
  public title = 'Indicadores de buró';
  public indicadoresList: VariableIndicador[];
  public responseVI: ResponseVI;
  public itemCheck: ItemCheck = new ItemCheck(0, false);
  constructor(
    private _router: Router,
    private _DefinicionVariablesService: DefinicionVariablesService
  ) {

  }

  setCheck(obj: any) {
    obj.status = !obj.status;

    this.itemCheck = new ItemCheck(obj.id, obj.status)
    this._DefinicionVariablesService.setChect(this.itemCheck).subscribe(
      resp => {
        if (resp.status == 0 && resp.message == 'successful')
          this.getVariables();
        else {
          obj.status = !obj.status;
          console.log(resp);
        }
      },
      err => {
        console.log("error", err);
      }
    );

  }

  ngOnInit() {
    this.getVariables();
  }

  ngDoCheck() {

  }

  onSubmmit() {
    this._router.navigate(['/definicion-variables/activacion-variables-cliente']);
  }

  getVariables() {
    this._DefinicionVariablesService.getVariables().subscribe(
      resp => {
        this.responseVI = resp;
        if (this.responseVI.status == 0 && this.responseVI.message == 'successful') this.indicadoresList = this.responseVI.data;
        this.indicadoresList.forEach((element, index) => {
          if (element.id == 1) this.indicadoresList.splice(index, 1);
        });
      }
    );
  }

}

