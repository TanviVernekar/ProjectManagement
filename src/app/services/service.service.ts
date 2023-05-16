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
   return  this.http.get('https://pmt-service.onrender.com/api/employees',{
      headers:{
        'x-api-key':'secrt-dev-1505'
      }
    })
  }

  addEmployee(data){
    return this.http.post('https://pmt-service.onrender.com/api/employees',data,{
      headers:{
        'x-api-key':'secrt-dev-1505'
      }
    })
  }

  getProjectListApi(){
    return  this.http.get('https://pmt-service.onrender.com/api/projects',{
      headers:{
        'x-api-key':'secrt-dev-1505'
      }
    })
  }

  addProject(data){
    return this.http.post('https://pmt-service.onrender.com/api/projects',data,{
      headers:{
        'x-api-key':'secrt-dev-1505'
      }
    })
  }

  getDesignationApi(){
    return  this.http.get('https://pmt-service.onrender.com/api/designations',{
       headers:{
         'x-api-key':'secrt-dev-1505'
       }
     })
   }
}
