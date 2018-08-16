import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmationData } from '../../interfaces/confirmation';
import { ConfirmationService } from '../../services/confirmation.service';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [ConfirmationService]
})
export class ConfirmationComponent implements OnInit {

  ngOnInit() { }
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData,
    public _ConfirmationService: ConfirmationService
  ) { }
  onNoClick(): void { this.dialogRef.close(); }

  public cancelar() {
    this.dialogRef.close(false);
  }

  public confirmar() {
    this.dialogRef.close({ userToDown: this.data.userToDown, index: this.data.data });
  }
}