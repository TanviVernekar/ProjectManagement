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
  openemp:boolean=false

  logoutStatus:boolean=false
  employeeslt:any=[]
 empname:any=[]
  routerdata:any

  filterstring: string = '';
  employeeList: any=[];
  projectList:any=[]
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

  constructor(public dialog: MatDialog, private service: ServiceService,private router:Router,private route: ActivatedRoute
   ) {
    // this.routerdata=this.route?.snapshot.paramMap.get('name')
   }

  
  ngOnInit(): void {
    this.employeeListDetails()
    this.projectListDetails()

    for(const employee of this.projectList){
      for(const peremp of employee.employees){
          this.empname=this.employeeslt.push(peremp)
          console.log("//",this.employeeslt)
       
      }
    }
   
    // this.projectList.

    // console.log(this.routerdata)
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


  
   

  //  console.log("data",data)
    // console.log('ts',event)

  }
  handlechange(){
    this.openemp=false
    console.log(this.openemp)

  }


  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
      // console.log("resss",response);
    });
  }

  projectListDetails() {
    this.service.getProjectListApi().subscribe((response) => {
      this.projectList = response;
      console.log("ppp",response);
    });
  }
}
