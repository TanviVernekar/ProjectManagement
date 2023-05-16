import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {


  
  // loginButton:boolean=true
  openemp:boolean=false

  logoutStatus:boolean=false

  filterstring: string = '';
  employeeList: any=[];
  peremployee:any

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
      name:'Noor',
      designation:'developer',
    },
    {
      name:'shilpuuu',
      designation:'developer'
    }
    
  ];

  constructor(public dialog: MatDialog, private service: ServiceService,private router:Router) {}

  ngOnInit(): void {
    this.employeeListDetails()
    // console.log(this.data)
  }
  // openemp:boolean=false

  //  filteredEmployee=[]
  // show:number;



  // login(){
    
  //   this.loginButton=false
  //   // this.event.emit(this.loginButton)

  // }

  logout(){
    // localStorage.removeItem()
    // alert('clicked')
    // this.loginButton=true
    // this.event.emit(this.loginButton)
  // this.logoutStatus = false
  // console.log("lgsts",this.logoutStatus)
    // this.router.navigate(['']);
    this.logoutStatus=true
    // localStorage.removeItem('signupusers')
    // console.log(loginForm.value)
    // localStorage.removeItem('authstatus')
    localStorage.setItem('authstatus',JSON.stringify(false));


    this.router.navigate(['']);
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      height: '60%',
      width: '28%',

      // panelClass: 'full-screen-modal',
    });
  }

  openempDetail(data){
    // console.log("term",this.term)
    this.openemp=true
    // this.show = event
    this.peremployee = data
   console.log("data",data)
    console.log('ts',event)

  }
  handlechange(){
    this.openemp=false
    console.log(this.openemp)

  }


  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
      console.log("resss",response);
    });
  }
}
