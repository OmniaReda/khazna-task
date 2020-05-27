import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.services';
import {combineLatest as observableCombineLatest, Subject, Observable, Subscription} from 'rxjs';
import { Employees } from './employees';




@Component({
  selector: 'dataOfEmployee',
  templateUrl: './dataOfEmployee.component.html',
})

export class dataOfEmployee implements OnInit {
 
  // employees: Object;

  // constructor( private data: DataService ) { }

  employees : Employees[];
  
  constructor(public http: HttpClient, private apiService: DataService){}

  ngOnInit(){
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.apiService
    .getEmployees()
    .subscribe((data:any) => {
      
      this.employees = data.data;
      console.log(this.employees);
    });
  }


}
