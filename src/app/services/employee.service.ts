import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeLists = new Subject<any>();
  url = environment.API_URL;
  constructor(private http: HttpClient) {}
  error = new Subject<string>();
  getEmpListApi() {
    return (
      this.http.get(`${this.url}employees`).subscribe((response) => {
        this.employeeLists.next(response);
      }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  addEmployee(data) {
    return this.http
      .post(`${this.url}employees`, data)
      .subscribe((response) => {
        this.getEmpListApi();
      });
  }

  getDesignationApi() {
    return this.http.get(`${this.url}designations`);
  }
}
