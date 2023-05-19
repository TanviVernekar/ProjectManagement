import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  url=environment.API_URL
  constructor(private http:HttpClient) { }

  getProjectListApi(){
    return  this.http.get(`${this.url}projects`)
  }

  addProject(data){
    return this.http.post(`${this.url}projects`,data)
  }

  addProjectStatusApi(data){
    let body
    if(data?.status === 'New'){
      body={
        status : 'In Progress'
      }
    }else {
      body={
        status : 'Closed'
      }
    }
    return this.http.put(`${this.url}projects/${data?.id}/update_status`,body)
  }
}
