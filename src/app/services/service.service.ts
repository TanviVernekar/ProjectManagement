import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  logout: boolean = false;
  constructor(private http:HttpClient) {}
  setLogStatus(data) {
    // this.logout=true
    this.logout = data;
  }

  getLogstatus() {
    return this.logout;
  }

  getEmpListApi(){
   return  this.http.get('https://project-management-tool-dff6f-default-rtdb.asia-southeast1.firebasedatabase.app/employees.json',{
      params:{
        key:'AIzaSyDEenVAbz9MYo4r96CxIfxLPFNQcyrMD1U'
      }
    })
  }

  addEmployee(data){
    return this.http.post('https://project-management-tool-dff6f-default-rtdb.asia-southeast1.firebasedatabase.app/employees.json',data)
  }
}
