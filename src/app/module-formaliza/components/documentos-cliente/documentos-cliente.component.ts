import { Component, OnInit } from '@angular/core';
import { DocumentosClienteService } from '../../services/documentos-cliente.service';

@Component({
  selector: 'app-documentos-cliente',
  templateUrl: './documentos-cliente.component.html',
  styleUrls: ['./documentos-cliente.component.scss'],
  providers: [DocumentosClienteService]
})
export class DoumentosClienteComponent implements OnInit {

  constructor(
    public _DocumentosClienteService: DocumentosClienteService
  ) { }

  ngOnInit() {
  }

  isBTNActive(name: string) {
    return name == this._DocumentosClienteService.BTN_SELECTED.textBTN ? '#AE9911' : '#8B98A1';
  }

  setName(newName: any) {
    this._DocumentosClienteService.setName(newName);
  }

}
