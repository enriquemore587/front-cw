import { Component, OnInit } from '@angular/core';

import { PruebasService } from '../../services/pruebas.service';
import { log } from 'util';

import { Router, ActivatedRoute, Params } from '@angular/router';
// models
import { ReqValidateRange } from '../../models/reqValidateRange';
import { ReqValidateList } from '../../models/reqValidateList';
// begin message
import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
// end message

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
    // start Metodo Messages
    showMessage(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
    // end Metodo Messages
    public ocupations: any[] = [];

    public user: any = {};
    public wait: boolean = false;

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
        private _router: Router,
        private _PruebasService: PruebasService,
        public snackBar: MatSnackBar  // messages
    ) { }

    ngOnInit() {
        let auth = localStorage.getItem('auth');
        if (!auth) return this._router.navigate(['/login-panel/inicioSesion']);

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

    get_pesos(item: any) {
        return item.var_fix_id > 0 && item.var_fix_id != 1 && item.var_fix_id != 4 && item.var_fix_id != 5 && item.var_fix_id != 7 && item.var_fix_id != 8 && item.var_fix_id != 9 && item.var_fix_id != 3 && item.var_fix_id != 2 && item.var_fix_id != 14;
    }

    public list_invalidated: any[] = [];
    public list_validated: any[] = [];

    public getBG(index: number) {
        return (index % 2) == 0;
    }

    runTEST() {
        this.list_invalidated = [];
        this.list_validated = [];
        this.wait = true;
        this._PruebasService.get_user_for_test().subscribe(
            resp => {
                if (resp.status == 0 && resp.message == 'no information') return this.showMessage('No se encontro usuario para realizar test', "Entendido");
                resp.data.test = true;
                this._PruebasService.runValidation(resp.data).subscribe(
                    respuesta => {
                        this.wait = false;
                        if (respuesta.status == 1200) this.list_invalidated = respuesta.data;
                        else if (respuesta.status == 0 && respuesta.message == "successful") this.list_validated = respuesta.data;
                        else if (respuesta.status == 2200 && respuesta.message == "no information") {
                            this.showMessage("Usuario con informacion incompleta","Ocultar");
                        }
                    },
                    err => {
                        this.wait = false;
                        console.log(err);
                    }
                );
            },
            error => {
                console.log(1111, "error  => " + error);
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