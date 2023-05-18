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
  // loginButton:boolean=true
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
  ) {
    // this.routerdata=this.route?.snapshot.paramMap.get('name')
  }

  ngOnInit(): void {
    this.projectListDetails();
    this.employeeListDetails();
  }

  logout() {
    // localStorage.removeItem()
    // alert('clicked')
    // this.loginButton=true
    // this.event.emit(this.loginButton)
    // this.logoutStatus = false
    // console.log("lgsts",this.logoutStatus)
    // this.router.navigate(['']);
    this.logoutStatus = true;
    // localStorage.removeItem('signupusers')
    // console.log(loginForm.value)
    // localStorage.removeItem('authstatus')
    localStorage.setItem('authstatus', JSON.stringify(false));

    this.router.navigate(['']);
  }

  navigate() {
    if (localStorage.getItem('peremployees')) {
      this.peremployee = JSON.parse(localStorage.getItem('peremployees'));
      // console.log('///', this.peremployee);
    } else {
      this.peremployee = this.employeeList[0];
      // console.log('+++', this.peremployee);
    }

    this.employeeslt = [];

    for (const employee of this.projectList) {
      for (const peremp of employee?.employees) {
        if (peremp?.id === this.peremployee?.id) {
          this.employeeslt.push(employee?.name);
        }
      }
    }
    // this.peremployee=this.employeeList[0]
    //   console.log("+++",this.peremployee)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      height: '60%',
      width: '28%',

      // panelClass: 'full-screen-modal',
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
        // console.log('???', this.employeeList[0]);
      }
    }
  }

  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
    
    });
  }

  projectListDetails() {
    this.service.getProjectListApi().subscribe((response) => {
      this.projectList = response;
      if(this.projectList){
        if (this.employeeList) {
          this.navigate();
        }
      }

    });
  }
}
