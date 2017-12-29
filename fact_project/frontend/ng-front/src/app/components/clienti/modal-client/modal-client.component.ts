import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent  {
  name: any;


  constructor(
    public dialogRef: MatDialogRef<ModalClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSelection() {
    this.dialogRef.close(this.data);
    console.log(this.data);
  }

}
