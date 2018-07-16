import { Component, OnInit, Inject } from '@angular/core';
import { UserListService } from '../../services/user-list.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserListService]
})
export class UsersListComponent implements OnInit {

  public step: number = 0;
  constructor(
    public _UserListService: UserListService,
    public dialog: MatDialog
  ) {
    this.step = 0;
  }

  ngOnInit() {
  }


  public setStep(index: number) {
    this._UserListService.getGeneralPersonalData(this._UserListService.userList[index].id);
    this._UserListService.getLocationsByUserSuccess(this._UserListService.userList[index].id, true);
    this._UserListService.getLocationsByUserSuccess(this._UserListService.userList[index].id, false);
    this.step = index;
  }
  
  public sendURL(url: string) {
    console.log(url);
    const dialogRef = this.dialog.open(ShowImageDialog, {
      width: '100vh',
      data: { url: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'showImage',
  templateUrl: 'showImage.html',
})
export class ShowImageDialog {

  constructor(
    public dialogRef: MatDialogRef<ShowImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  onNoClick(): void { this.dialogRef.close(); }

}