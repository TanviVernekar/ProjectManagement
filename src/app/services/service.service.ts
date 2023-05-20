import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  logout: boolean = false;
  url = environment.API_URL;
  constructor(private http: HttpClient) {}
  setLogStatus(data) {
    // this.logout=true
    this.logout = data;
  }

  getLogstatus() {
    return this.logout;
  }
}
