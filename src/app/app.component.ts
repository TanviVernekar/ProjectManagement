import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ProjectManagement';

constructor(private projectservice:ProjectService, private employeeservice:EmployeeService){}
  
ngOnInit(): void {
  this.employeeservice.getEmpListApi()
  this.projectservice.getProjectListApi()
}
}
