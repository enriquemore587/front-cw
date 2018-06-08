import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { ResponseIccBank } from '../../models/responseIccBank'
import { GenericResponse } from '../../models/genericResponse';
import { IndicadorBuro } from '../../models/indicadorBuro';
import { Score } from '../../models/Score';
import { log } from 'util';

@Component({
    selector: 'criterios-buro',
    templateUrl: './criteriosBuro.component.html',
    styleUrls: ['./criteriosBuro.component.css'],
    providers: [DefinicionVariablesService]
})
export class CriteriosBuro implements OnInit {
    public title: string = 'CRITERIOS MÍNIMOS';
    public indicadoresBuro: IndicadorBuro[];
    public responseIccBank: ResponseIccBank[];
    public responseIccBuro: ResponseIccBank[];
    public ranges: any = {};
    public scoreList: Score[] = [];
    public changeScore: number = 0;
    
    labelPosition;

    constructor(
        private _router: Router,
        private _DefinicionVariablesService: DefinicionVariablesService
    ) {
    }

    ngOnInit() {
        this._DefinicionVariablesService.getCriteriosIndicadores().subscribe(
            resp => {
                /* 1 delete
                this.getScore();
                this.getScoreBank();
                */
                if (resp.status == 0) {
                    this.indicadoresBuro = <IndicadorBuro[]>resp.data;

                    this.indicadoresBuro.forEach(element => {
                        if (element.id == 2 && element.status) {
                            this.ranges.BC_Score = element.range.split('-')[0];
                            //this.getScore();
                            this.getScoreBank();
                        } else if (element.id == 3 && element.status) {    //  icc
                            if (Number(element.range.split('-')[0]) < 4) this.ranges.icc = 4;
                            else this.ranges.icc = element.range.split('-')[0];
                            this.getIccBank();
                        }
                        else if (element.id == 5 && element.status) {
                            this.ranges.MOP_mayor_min = element.range.split('-')[0];
                            this.ranges.MOP_mayor_max = element.range.split('-')[1];
                        }
                        else if (element.id == 6 && element.status) {
                            this.ranges.Saldo_Vencido = element.range.split('-')[0];
                            this.ranges.Saldo_Vencido_max = element.range.split('-')[1];
                        }
                        else if (element.id == 4 && element.status) {
                            this.labelPosition = 'false';
                        }else if (element.id == 1) {
                            this.ranges.tasa = element.range.split('-')[0];
                        }
                    });
                }

                else console.log('no data');

            }
        );
    }

    noo(value){
    }

    saveChange(id, value){
        let saveObj : any = {
            "id_var_fix": id,
            "range": null,
            "is_ok": null,
            "ver_array" : null
        };
        if (id == 1) {
            saveObj.range = this.ranges.tasa+"-0";
        }else
        if (id == 2) {
            saveObj.range = this.ranges.BC_Score+"-1000";
        }else if (id == 3) {
            saveObj.range = this.ranges.icc+"-9";
        }else if(id == 4){
            saveObj.is_ok = value;
        }
        else if(id == 5){
            saveObj.range = this.ranges.MOP_mayor_min+"-"+this.ranges.MOP_mayor_max;
        }
        else if(id == 6){
            saveObj.range = this.ranges.Saldo_Vencido+"-"+this.ranges.Saldo_Vencido_max;
        }
        this._DefinicionVariablesService.setBankVariable(saveObj).subscribe(
            resp => {
              if (resp.status != 0 && resp.message != 'successful') console.log("something bad");
            },
            err => {
              console.log("error", err);
            }
          );
    }


  

    getIccBank() {
        this._DefinicionVariablesService.getIccBank(this.ranges.icc).subscribe(
            resp => {
                if (resp.status == 0) {
                    this.responseIccBank = <ResponseIccBank[]>resp.data;
                    this._DefinicionVariablesService.getIccBuro(this.ranges.icc).subscribe(
                        resp2 => {
                            if (resp.status == 0) this.responseIccBuro = <ResponseIccBank[]>resp2.data;
                            else console.log('no data - buro');
                        }
                    );
                }
                else console.log('no data - bank');
            }
        );
    }
    

    changeStore(value: Score) {
        this._DefinicionVariablesService.setAScoreBank(value).subscribe(
            resp => {
              if (resp.status != 0 && resp.message != 'successful') console.log("somethink bad");
            },
            err => {
              console.log("error", err);
            }
          );
    }

    getScoreBank(){
        this._DefinicionVariablesService.getScoreBank().subscribe(
            resp => {
                if (resp.status == 0) {
                    resp.data.forEach(element => {
                        this.scoreList.push(new Score(
                            element.id, 
                            element.rango.split("-")[0],
                            element.rango.split("-")[1], 
                            element.plazo));
                    });
                }
                else console.log('no data - bank');
            }
        );
    }

    public newScore: Score;
    getScore() {
        this._DefinicionVariablesService.getHelp_score(this.changeScore).subscribe(
            resp => {
                if (resp.status == 0) {
                    this.newScore = <Score>resp.data;

                    if (this.scoreList.length == 0) 
                        this.scoreList.push(this.newScore);
                    else this.scoreList[this.scoreList.length - 1] = this.newScore;
                }
                else console.log('no data - getScore');
            }
        );
    }

    change_a_ICC(item){
        let obj = {
            "icc": item.icc,
	        "value": item.free
        }
        this._DefinicionVariablesService.change_a_ICC(obj).subscribe(
            resp => {
              if (resp.status != 0 && resp.message != 'successful') console.log("somethink bad");
            },
            err => {
              console.log("error", err);
            }
          );
    }

    changeICC(id:any) {
        if (!this.ranges.icc || this.ranges.icc == '') return;
        if (this.ranges.icc > 9) this.ranges.icc = 9;
        if (this.ranges.icc < 4) this.ranges.icc = 4;
        this.getIccBank();
        this.saveChange(id,false);
    }
    

    setCheck(item: any) {
        console.log(item);
    }
}