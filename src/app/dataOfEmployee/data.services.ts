import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from './employees';
// import * as Rx from "rxjs/Rx";
import {throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {}
  getEmployees() {
    return this.httpClient.get(`http://dummy.restapiexample.com/api/v1/employees`).
        pipe(
           map((data: Employees[]) => {
            //    console.log(data);
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }
}