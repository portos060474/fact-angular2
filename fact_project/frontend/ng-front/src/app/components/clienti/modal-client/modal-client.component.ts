import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent  {

  private changed = false;

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

  doSomething (e) {
    let whatChanged = e.target.getAttribute('ng-reflect-name');
    let newValue = this[whatChanged];
    console.log(whatChanged, newValue, e);
}
}
