import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(public dialog: MatDialog, private service: ServiceService) {}
  ngOnInit(): void {
    this.employeeListDetails();
  }
  openemp:boolean=false
  data: any = [
    'employee1',
    'employee2',
    'employee3',
    'employee4',
    'empployee5',
    'employee6',
  ];
  employeeList: any;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      height: '60%',
      width: '28%',

      // panelClass: 'full-screen-modal',
    });
  }

  openempDetail(){
this.openemp=true
  }


  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
      console.log(response);
    });
  }
}
