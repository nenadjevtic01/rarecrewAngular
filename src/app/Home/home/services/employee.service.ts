import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRawEmployee} from "../interfaces/i-raw-employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl="https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
  constructor(private http:HttpClient) { }

  getEmployee():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
