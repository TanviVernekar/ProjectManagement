import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  url=environment.API_URL
  constructor(private http:HttpClient) {}

  getEmpListApi(){
    return  this.http.get(`${this.url}employees`)
   }

   addEmployee(data){
    return this.http.post(`${this.url}employees`,data)
  }

  getDesignationApi(){
    return  this.http.get(`${this.url}designations`)
   }

}
