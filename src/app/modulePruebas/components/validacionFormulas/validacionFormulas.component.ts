import { Component, OnInit } from '@angular/core';

import { PruebasService } from '../../services/pruebas.service';
import { log } from 'util';

// models
import { ReqValidateRange } from '../../models/reqValidateRange';
import { ReqValidateList } from '../../models/reqValidateList';

@Component({
    selector: "validacion-formulas",
    templateUrl: './validacionFormulas.component.html',
    styleUrls: ['./validacionFormulas.component.css'],
    providers: [PruebasService]
})
export class ValidacionFormulasComponent implements OnInit {
    public title = 'Validación Fórmulas';
    public variables: any[] = [];
    public variablesCustom: any[] = [];
    nacionalidad = [
        { value: '1', viewValue: 'MEXICANA' },
        { value: '2', viewValue: 'EXTRANGERA' }
    ];

    alertasH = [
        { value: true, viewValue: 'SI' },
        { value: false, viewValue: 'NO' }
    ];

    public ocupations: any[] = [];

    public user: any = {};

    public gasto_personal;
    pagos_buro;
    mensualidad_disponible;
    valor_tope_mensualidad;
    mensualidad_minima_disponible;
    pago_sobre_ingreso;
    plazo_solicitado;
    plazo_disponible;
    minimo_plazo;
    tasa_mensual;
    maxima_linea_disponible;;


    constructor(
        private _PruebasService: PruebasService
    ) { }

    ngOnInit() {
        //this.getOccupations();
        //this.getVariablesToValid();
    }

    getOccupations() {
        this._PruebasService.getOccupations().subscribe(
            resp => {
                if (resp.status == 0 && resp.message == 'successful') {
                    resp.data.forEach(element => {
                        this.ocupations.push({ value: element.id, viewValue: element.name });
                    });
                }
            }
        );
    }

    getVariablesToValid() {
        this._PruebasService.getVariablesToValid().subscribe(
            resp => {
                if (resp.status == 0 && resp.message == 'successful') {
                    this.variables = resp.data.default;
                    this.variablesCustom = resp.data.custom;
                    this.variablesCustom.forEach(element => {
                        element.pasa = "aun";
                        element.alert = "";
                    });
                    console.log('this.variables', this.variables);
                }
            }
        );
    }

    clearAlerts() {
        this.variables.forEach(element => {
            element.alert = true;
        });
    }

    clearAlertsBeging(item: number) {
        for (let index = item; index < this.variables.length; index++) {
            const element = this.variables[index];
            element.alert = true;
        }
    }
    get_lastIndex() {
        return this.list_invalidated.length - 1;
    }
    public list_invalidated: any[] = [];
    public list_validated: any[] = [];
    runTEST() {
        this._PruebasService.get_user_for_test().subscribe(
            resp => {
                this.list_invalidated = [];
                this.list_validated = [];
                resp.data.test = true;
                this._PruebasService.runValidation(resp.data).subscribe(
                    respuesta => {
                        if (respuesta.status == 1200) {
                            this.list_invalidated = respuesta.data;
                        } else if (respuesta.status == 0) {
                            this.list_validated = respuesta.data;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        );
    }

    checkTest() {
        this.clearAlerts();
        for (let index = 0; index < this.variables.length; index++) {
            const element = this.variables[index];
            switch (element.type) {
                case 'RANGO': {
                    if (this.user[element.name] == undefined || this.user[element.name] == '') {
                        this.variables[index].alert = 'NO PASA';
                        return;
                    }
                    else {
                        this._PruebasService.validateRange(new ReqValidateRange(element.restriction, this.user[element.name])).subscribe(
                            resp => {
                                if (resp.status == 0 && resp.message == 'successful') {
                                    if (!resp.data) {
                                        this.variables[index].alert = 'NO PASA';
                                        this.clearAlertsBeging(element.short);
                                    }
                                    this.variables[index].alert = 'SI PASA';

                                }
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                    break;
                }
                case 'LISTA': {
                    if (this.user[element.name] == undefined || this.user[element.name] == '') {
                        this.variables[index].alert = 'NO PASA';
                        return;
                    }
                    this._PruebasService.validateList(new ReqValidateList(element.restriction, this.user[element.name])).subscribe(
                        resp => {
                            if (resp.status == 0 && resp.message == 'successful') {
                                if (!resp.data) {
                                    this.variables[index].alert = 'NO PASA';
                                    this.clearAlertsBeging(element.short);
                                }
                                this.variables[index].alert = 'SI PASA';
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    );

                    break;
                }
                case 'SINO': {
                    if (this.user[element.name] === undefined || this.user[element.name] === '') {
                        this.variables[index].alert = 'NO PASA';
                        return;
                    }
                    console.log('A=>' + element.restriction, this.user[element.name]);

                    if (element.restriction != this.user[element.name]) {
                        console.log(this.variables);
                        this.variables[index].alert = 'NO PASA';
                        this.clearAlertsBeging(element.short);
                        return;
                    }
                    this.variables[index].alert = 'SI PASA';
                    break;
                }
            }
        }

        for (let index = 0; index < this.variablesCustom.length; index++) {
            const element = this.variablesCustom[index];
            if (element.pasa == 'SI') {
                element.alert = "SI";
                element.pasa = "SI";
            } else if (element.pasa == 'NO') {
                element.alert = "NO";
                element.pasa = "no";
                return;
            } else {
                element.alert = "NO";
                element.pasa = "noO";
                return;
            }
        }

    }

}