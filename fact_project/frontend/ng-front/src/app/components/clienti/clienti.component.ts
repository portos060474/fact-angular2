import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Client } from '../../models/client';
import { ClientService } from './client.service';
import { MatTableDataSource, MatTableModule, MatPaginator, MatSort } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';

import {ModalClientComponent} from './modal-client/modal-client.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css'],
  providers: [ HttpClientModule, ClientService ]
})

export class ClientiComponent implements OnInit {
  animal: any;
  name: any;

    public clienti: Client[] ;

    displayedColumns = ['nume', 'adresa', 'cui', 'activ'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private clientService: ClientService,
      public dialog: MatDialog,
      private changeDetectorRefs: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.clientService.getCustomers()
    .subscribe(
    clienti => {
            this.clienti = clienti;
            this.dataSource.data = clienti;
            },
    error => alert('error'));
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(row) {
      let method = 'post';
      if (row !== undefined) {
        method = 'put';
      } else {
        row = new Client(null, '', '', '', '', '', '', '', 'Yes');
      }

      const dialogRef = this.dialog.open(ModalClientComponent, {
        width: '450px',
        data: row,
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result !== undefined ) {
          // console.log('The dialog was closed' + result);
          if (this.clientService.updateClient(method, result)) {
            this.dataSource.data.push(row);
          }
        }
      });


    }

}

const ELEMENT_DATA = [];


