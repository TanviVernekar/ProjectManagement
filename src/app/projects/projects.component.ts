import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  constructor(public dialog: MatDialog, private service:ServiceService,private router:Router) {}

  filterstring: string = '';

  openemp:boolean=false
  perproject:any

  ngOnInit(): void {
    this.projectListDetails()
  }


  logoutStatus:boolean=false
  projectList:any = [];
  term:string

  data:any=[
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
    {
      name:'project',
      status:'yet to start'
    },
  ]



  logout(){
    // localStorage.removeItem()
    // alert('clicked')
    // this.loginButton=true
    // this.event.emit(this.loginButton)
  // this.logoutStatus = false
  // console.log("lgsts",this.logoutStatus)
    // this.router.navigate(['']);
    this.logoutStatus=true
    localStorage.setItem('authstatus',JSON.stringify(false))
    this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      height: '60%',
      width: '28%',
     
      // panelClass: 'full-screen-modal',
     
    });
  }

  openempDetail(data){
    // console.log("term",this.term)
    this.openemp=true
    // this.show = event
    this.perproject = data
   console.log("data",data)
    console.log('ts',event)

  }
  handlechange(){
    this.openemp=false
    console.log(this.openemp)

  }

  projectListDetails() {
    this.service.getProjectListApi().subscribe((response) => {
      this.projectList = response;
      console.log("ppp",response);
    });
  }
}
