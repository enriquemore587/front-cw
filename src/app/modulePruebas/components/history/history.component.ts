import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Solicitud } from './solicitud';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers : [HistoryService]
})
export class HistoryComponent implements OnInit{
  public displayedColumns: string[] = ['id', 'nacionalidad', 'ingresoDeclarado', 'topeMen', 'BCscore', 'gastoICC', 'alertasH', 'MOPmayor', 'Saldovencido', 'tasa', 'edad', 'pagosBuro', 'plazoSolicitado', 'montoSolicitado', 'plazoDisponible', 'mensualidad', 'plazo', 'linea_aprobada', '_tasa'];
  
  constructor(
    private _HistoryService : HistoryService
  ) {
    this._HistoryService.getListRegistros();
  }

  ngOnInit() {
  }

}
