import { Component, OnInit, ViewChild} from '@angular/core';

import { HttpModule } from '@angular/http';
import { Client } from './client';
import { ClientService } from './client.service'
import { MatTableDataSource, MatTableModule, MatPaginator,MatSort } from '@angular/material';
import { JwtHelper } from 'angular2-jwt';



@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css'],
  providers: [ HttpModule, ClientService ] 
})

export class ClientiComponent implements OnInit {
    public clienti: Client[] ;

    displayedColumns = ['nume','adresa', 'cui', 'activ'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;



  

    constructor(private clientService: ClientService) {

    }

  ngOnInit() {
    this.clientService.getCustomers()
        .subscribe(
        clienti =>{
                this.clienti = clienti;
                this.dataSource.data = clienti
                },
        error => alert("error"));
        
       
    
 
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

  test(row) {
    // console.log(row)
  }

  changeClientActiveStatus(client) {
    let newstatus: string;

    console.log("changing the ative status of " + client.nume )
    if (client.activ == 'Yes') {
      console.log("era activ, il dezactivam");
      newstatus="No";
      } 
    else {
      console.log("era inactiv, il activam");
      newstatus="Yes";
      }
  
    this.clientService.setCustomerActiveStatus(client,newstatus)
  }


}


const ELEMENT_DATA = [];
