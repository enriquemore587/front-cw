import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { log } from 'util';
import { FormControl, Validators } from '@angular/forms';

import { DefinicionVariablesService } from '../../services/definicionVariables.service';
import { ResponseVI } from '../../models/responseVI';
import { and } from '@angular/router/src/utils/collection';


import { IndicadorBuro } from '../../models/indicadorBuro';
import { Select } from '../../models/selects';

import { MatSnackBar } from '@angular/material';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ErrorForms } from '../../../material/ErrorsStateMatcher';
@Component({
    selector: 'criterios-perfil',
    templateUrl: './criteriosPerfilCliente.component.html',
    styleUrls: ['./criteriosPerfilCliente.component.css'],
    providers: [DefinicionVariablesService]
})
export class CriteriosPerfilClienteComponent implements OnInit {
    title = 'Criterios perfil de cliente';

    public indicadoresPerfil: IndicadorBuro[];
    public ranges: any = {};
    public profesiones: Select[] = [];
    public profesionSelected: Select;
    public nacionalidades: Select[] = [];
    public nacionalidadSelected: Select;

    edadMax = new FormControl('', [
        Validators.required
    ]);
    matcher = new ErrorForms();
    constructor(
        private _router: Router,
        private _DefinicionVariablesService: DefinicionVariablesService,
        public snackBar: MatSnackBar // messages
    ) {

    }

    showMessage(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000
        });
    }

    ngOnInit() {
        this.initMenu();
    }

    setCheck(item) {
        this.indicadoresPerfil.forEach(element => {
            if (element.id == 8) {
                if (item.status) {
                    element.var_array = element.var_array.replace('-' + item.id, '').replace('' + item.id, '');
                } else {
                    element.var_array += '-' + item.id;
                }
                this._DefinicionVariablesService.setACheckOcupations(element.var_array).subscribe(
                    resp => {
                        if (resp.status == 0 && resp.message == 'successful')
                            this.getOcupations(element.var_array);
                        else this.showMessage(`Status: ${String(resp.status)}`, "Ocultar mensaje");
                    },
                    err => {
                        this.showMessage(`Ocurrió un problema`, "Ocultar mensaje");
                    }
                );
            }
        });
    }

    setNacionalidad(item) {
        this.indicadoresPerfil.forEach(element => {
            if (element.id == 9) {
                if (item.status)
                    element.var_array = element.var_array.replace('-' + item.id, '').replace('' + item.id, '');
                else
                    element.var_array += '-' + item.id;

                this._DefinicionVariablesService.setACheckNations(element.var_array).subscribe(
                    resp => {
                        if (resp.status == 0 && resp.message == 'successful')
                            this.getNacionalidad(element.var_array);
                        //else this.showMessage(`Status: ${String(resp.status)}`, "Ocultar mensaje");
                    },
                    err => {
                        this.showMessage(`Ocurrió un problema`, "Ocultar mensaje");
                        console.log("error", err);
                    }
                );
            }
        });

    }

    saveChange(id, value) {
        let saveObj: any = {
            "id_var_fix": id,
            "range": null,
            "is_ok": null,
            "ver_array": null
        };

        if (id == 7) {
            this.ranges.edadMin = this.ranges.edadMin ? this.ranges.edadMin : 1;
            saveObj.range = this.ranges.edadMin + "-" + this.ranges.edadMax;
        }
        else if (id == 10) {
            this.ranges.ingresoMin = this.ranges.ingresoMin ? this.ranges.ingresoMin : 1;
            saveObj.range = this.ranges.ingresoMin + "-" + this.ranges.ingresoMax;
        }
        else if (id == 11) {
            this.ranges.capacidadMin = this.ranges.capacidadMin ? this.ranges.capacidadMin : 1;
            saveObj.range = this.ranges.capacidadMin + "-" + this.ranges.capacidadMax;
        }
        else if (id == 12) {
            this.ranges.min_req_pag_min_Min = this.ranges.min_req_pag_min_Min ? this.ranges.min_req_pag_min_Min : 1;
            saveObj.range = this.ranges.min_req_pag_min_Min + "-" + this.ranges.min_req_pag_min_Max;
        }
        else if (id == 13) {
            this.ranges.min_pag_min_Min = this.ranges.min_pag_min_Min ? this.ranges.min_pag_min_Min : 1;
            saveObj.range = this.ranges.min_pag_min_Min + "-" + this.ranges.min_pag_min_Max;
        }
        else if (id == 14) {
            this.ranges.Porcentaje_pago = this.ranges.Porcentaje_pago ? this.ranges.Porcentaje_pago : 1;
            saveObj.range = this.ranges.Porcentaje_pago + "-0";
        }
        else if (id == 15) {
            this.ranges.BRUTOMin = this.ranges.BRUTOMin ? this.ranges.BRUTOMin : 1;
            saveObj.range = this.ranges.BRUTOMin + "-" + this.ranges.BRUTOMax;
        }
        else if (id == 16) {
            this.ranges.NETOMin = this.ranges.NETOMin ? this.ranges.NETOMin : 1;
            saveObj.range = this.ranges.NETOMin + "-" + this.ranges.NETOMax;
        }

        this._DefinicionVariablesService.setBankVariable(saveObj).subscribe(
            resp => {
                if (resp.status != 0 && resp.message != 'successful') this.showMessage(`Ocurrió un problema`, "Ocultar mensaje");
            },
            err => {
                this.showMessage(`Ocurrio un problema`, "Ocultar mensaje");
                console.log("error", err);
            }
        );

    }

    public checkEdad() {
        this.ranges.edadMax = this.ranges.edadMax < 100 ? this.ranges.edadMax : 99;
        this.ranges.edadMax = this.ranges.edadMax < 1 ? 1 : this.ranges.edadMax;
        this.ranges.edadMin = this.ranges.edadMin <= this.ranges.edadMax ? this.ranges.edadMin : this.ranges.edadMax;
    }
    public checkIngreDecMen() {
        this.ranges.ingresoMax = this.ranges.ingresoMax < 1 ? 1 : this.ranges.ingresoMax;
        this.ranges.ingresoMin = this.ranges.ingresoMin <= this.ranges.ingresoMax ? this.ranges.ingresoMin : this.ranges.ingresoMax;
    }
    
    public checkIngreBRUTO() {
        this.ranges.BRUTOMax = this.ranges.BRUTOMax < 1 ? 1 : this.ranges.BRUTOMax;
        this.ranges.BRUTOMin = this.ranges.BRUTOMin <= this.ranges.BRUTOMax ? this.ranges.BRUTOMin : this.ranges.BRUTOMax;
    }
    
    public checkIngreNETO() {
        this.ranges.NETOMax = this.ranges.NETOMax < 1 ? 1 : this.ranges.NETOMax;
        this.ranges.NETOMin = this.ranges.NETOMin <= this.ranges.NETOMax ? this.ranges.NETOMin : this.ranges.NETOMax;
    }
    public checkTopeMensualidad() {
        this.ranges.Porcentaje_pago = this.ranges.Porcentaje_pago > 100 ? 100 : this.ranges.Porcentaje_pago;
    }

    getNacionalidad(var_array: string) {
        let nat: Select[] = [];
        nat.push(new Select(1, 'Mexicana', false));
        nat.push(new Select(2, 'Extranjera', false));

        this.nacionalidades = [];
        let ninguna: boolean = true;
        let cuales: number[] = [];
        var_array.split('-').forEach(element2 => {
            if (Number(element2) != 0) {
                cuales.push(Number(element2));
                ninguna = false;
            }
        });
        if (ninguna)
            nat.forEach(item => this.nacionalidades.push(new Select(item.id, item.name, false)));
        else {
            nat.forEach(item => {
                let igual = true;
                let itemTemp: Select;
                cuales.forEach(cual => {
                    if (cual == item.id && igual) {
                        igual = false;
                        itemTemp = new Select(item.id, item.name, true);
                    }
                });
                if (!igual) this.nacionalidades.push(itemTemp);
                else this.nacionalidades.push(new Select(item.id, item.name, false));
            });
        }
    }

    getOcupations(var_array: any) {
        this._DefinicionVariablesService.getOccupations().subscribe(
            resp2 => {
                if (resp2.status == 0 && resp2.message == 'successful') {
                    this.profesiones = [];
                    let ninguna: boolean = true;
                    let cuales: number[] = [];
                    var_array.split('-').forEach(element2 => {
                        if (Number(element2) != 0) {
                            cuales.push(Number(element2));
                            ninguna = false;
                        }
                    });
                    if (ninguna)
                        resp2.data.forEach(item => this.profesiones.push(new Select(item.id, item.name, false)));
                    else {
                        resp2.data.forEach(item => {
                            let igual = true;
                            let itemTemp: Select;
                            cuales.forEach(cual => {
                                if (cual == item.id && igual) {
                                    igual = false;
                                    itemTemp = new Select(item.id, item.name, true);
                                }
                            });
                            if (!igual) this.profesiones.push(itemTemp);
                            else this.profesiones.push(new Select(item.id, item.name, false));
                        });
                    }
                }
                //else this.showMessage(`Status: ${String(resp2.status)}`, "Ocultar mensaje");
            }
        );
    }

    initMenu() {
        let auth = localStorage.getItem('auth');
        if (!auth) return this._router.navigate(['/login-panel/inicioSesion']);

        this._DefinicionVariablesService.getCriteriosIndicadoresPerfilCliente().subscribe(
            resp => {
                if (resp.status == 0 && resp.message == 'successful') {
                    this.indicadoresPerfil = resp.data;

                    this.indicadoresPerfil.forEach(element => {
                        /* EDAD */
                        if (element.id == 7 && element.status) {
                            this.ranges.edadMin = element.range.split('-')[0];
                            this.ranges.edadMax = element.range.split('-')[1];
                        }
                        /* OCUPACIÓN */
                        else if (element.id == 8 && element.status) {
                            let var_array = element.var_array;
                            this.getOcupations(var_array);
                        }
                        /* Nacionalidad */
                        else if (element.id == 9 && element.status) {
                            let var_array = element.var_array;
                            this.getNacionalidad(var_array);
                        }
                        /* Ingreso Declarado mes */
                        else if (element.id == 10 && element.status) {
                            this.ranges.ingresoMin = element.range.split('-')[0];
                            this.ranges.ingresoMax = element.range.split('-')[1];
                        }
                        /* Capacidad de pago */
                        else if (element.id == 11 && element.status) {
                            this.ranges.capacidadMin = element.range.split('-')[0];
                            this.ranges.capacidadMax = element.range.split('-')[1];
                        }
                        /* Minimo requerido pago minimo */
                        else if (element.id == 12 && element.status) {
                            this.ranges.min_req_pag_min_Min = element.range.split('-')[0];
                            this.ranges.min_req_pag_min_Max = element.range.split('-')[1];
                        }
                        /* Minimo pago minimo */
                        else if (element.id == 13 && element.status) {
                            this.ranges.min_pag_min_Min = element.range.split('-')[0];
                            this.ranges.min_pag_min_Max = element.range.split('-')[1];
                        }
                        /* Minimo pago minimo */
                        else if (element.id == 14 && element.status) {
                            this.ranges.Porcentaje_pago = element.range.split('-')[0];
                        }
                        /* Ingreso BRUTO */
                        else if (element.id == 15 && element.status) {
                            this.ranges.BRUTOMin = element.range.split('-')[0];
                            this.ranges.BRUTOMax = element.range.split('-')[1];
                        }
                        /* Ingreso NETO */
                        else if (element.id == 16 && element.status) {
                            this.ranges.NETOMin = element.range.split('-')[0];
                            this.ranges.NETOMax = element.range.split('-')[1];
                        }
                    });
                }
            },
            err => {
                this.showMessage(`Ocurrio un problema`, "Ocultar mensaje");
            }
        );
    }

}

