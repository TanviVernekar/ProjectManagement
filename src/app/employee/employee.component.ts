import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  employeeList: any = [];
  projectList: any = [];
  peremployee: any;

  localemployee: any;

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectListDetails();
    this.employeeListDetails();
  }

  logout() {
    this.logoutStatus = true;

    localStorage.setItem('authstatus', JSON.stringify(false));
     localStorage.removeItem('peremployees')
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
      for (const peremp of employee?.employees) {
        if (peremp?.id === this.peremployee?.id) {
          this.employeeslt.push(employee?.name);
        }
      }
    }
    localStorage.removeItem('peremployees');
  }
  handlechange() {
    this.openemp = false;
    console.log(this.openemp);
  }

  list() {
    if (this.employeeList.length > 0) {
      if (this.employeeList[0] != null) {
        this.peremployee = this.employeeList[0];
      }
    }
  }

  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
        this.navigate();
    });
  }

  projectListDetails() {
    this.service.getProjectListApi().subscribe((response) => {
      this.projectList = response;
          this.navigate();
    });
  }
}
