import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private toasterService: ToasterService) {}

    ngOnInit() {
    }

    popToast() {
      this.toasterService.pop('success', 'Args Title', 'Args Body');
    }
}
