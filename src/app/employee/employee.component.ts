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

  filterstring: string = '';
  employeeList: any=[];

  data: any = [
    {
      name:'tanvi',
      designation:'developer',
    },
    {
      name:'ashu',
      designation:'developer',
    },
    {
      name:'pooja',
      designation:'developer',
    },
    {
      name:'gowri',
      designation:'developer',
    },
    {
      name:'noor',
      designation:'developer',
    },
    {
      name:'shilpa',
      designation:'developer'
    }
    
  ];

  constructor(public dialog: MatDialog, private service: ServiceService) {}

  ngOnInit(): void {
    this.employeeListDetails()
    console.log(this.data)
  }
  // openemp:boolean=false

  //  filteredEmployee=[]
  // show:number;



  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      height: '60%',
      width: '28%',

      // panelClass: 'full-screen-modal',
    });
  }

  openempDetail(){
    // console.log("term",this.term)
    // this.openemp=true
    // this.show = event
   
    console.log('ts',event)


  }


  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
      console.log("resss",response);
    });
  }
}
