import { Component, OnInit } from '@angular/core';
import { SolicitantesService } from '../../services/solicitantes.service';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styleUrls: ['./solicitantes.component.scss']
})
export class SolicitantesComponent implements OnInit {

  public displayedColumns: string[] = ['numero', 'nombre', 'gender', 'level_study', 'occupation', 'ingreso_declarado', 'approved'];
  constructor(
    public _SolicitantesService : SolicitantesService
  ) { }

  ngOnInit() {
  }

}
