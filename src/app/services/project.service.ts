import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectList } from '../interface/project';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // projectLists = new Subject<any>();
  error = new Subject<string>();
  url = environment.API_URL;

  projectLists: BehaviorSubject<ProjectList[]> = new BehaviorSubject<
    ProjectList[]
  >([]);
  projectArray$: Observable<ProjectList[]> = this.projectLists.asObservable();
  constructor(private http: HttpClient) {}

  getProjectListApi() {
    this.http
      .get(`${this.url}projects`)
      .subscribe((response: ProjectList[]) => {
        this.projectLists.next(response);
      }),
      (error) => {
        this.error.next(error.message);
      };
  }

  addProject(data) {
    return (
      this.http.post(`${this.url}projects`, data).subscribe((res) => {
        this.getProjectListApi();
      }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  addProjectStatusApi(data) {
    let body;
    if (data?.status === 'New') {
      body = {
        status: 'In Progress',
      };
    } else {
      body = {
        status: 'Closed',
      };
    }
    return this.http.put(`${this.url}projects/${data?.id}/update_status`, body);
  }
}
