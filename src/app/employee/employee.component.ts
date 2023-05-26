import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeList } from '../interface/employee';
import { ProjectList } from '../interface/project';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  openemp: boolean = false;
  logoutStatus: boolean = false;
  employeeslt: any = [];
  empname: any = [];
  routerdata: any;
  filterstring: string = '';
  employeeList!: EmployeeList[];
  projectList: any = [];
  peremployee: any;
  localemployee: any;

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeservice: EmployeeService,
    private projectservice: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectListDetails();
    this.employeeListDetails();
  }

  logout() {
    this.logoutStatus = true;
    localStorage.setItem('authstatus', JSON.stringify(false));
    localStorage.removeItem('peremployees');
    this.router.navigate(['']);
  }

  navigate() {
    if (localStorage.getItem('peremployees')) {
      this.peremployee = JSON.parse(localStorage.getItem('peremployees'));
    } else {
      this.peremployee = this.employeeList[0];
    }
    this.employeeslt = [];
    for (const employee of this.projectList) {
      for (const peremp of employee?.employees) {
        if (peremp?.id === this.peremployee?.id) {
          this.employeeslt.push(employee?.name);
        }
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      height: '60%',
      width: '28%',
    });
  }

  openempDetail(data) {
    this.peremployee = data;
    this.employeeslt = [];
    for (const employee of this.projectList) {
      for (const peremp of employee.employees) {
        if (peremp?.id === this.peremployee?.id) {
          this.employeeslt.push(employee?.name);
        }
      }
    }
    localStorage.removeItem('peremployees');
  }
  handlechange() {
    this.openemp = false;
  }

  list() {
    if (this.employeeList.length > 0) {
      if (this.employeeList[0] != null) {
        this.peremployee = this.employeeList[0];
      }
    }
  }

  employeeListDetails() {
    this.employeeservice.employeeArray$?.subscribe((res: EmployeeList[]) => {
      this.employeeList = res;
      this.navigate();
    });
  }

  projectListDetails() {
      this.projectservice?.projectArray$?.subscribe((res: ProjectList[]) => {
        this.projectList = res;
        this.navigate();
      });
  }
}
