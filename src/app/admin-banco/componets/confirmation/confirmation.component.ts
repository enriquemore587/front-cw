import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmationData } from '../../interfaces/confirmation';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  ngOnInit() { }
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) { }
  onNoClick(): void { this.dialogRef.close(); }

  public cancelar() {
    this.dialogRef.close(false);
  }

  public confirmar() {
    this.dialogRef.close(true);
  }
}