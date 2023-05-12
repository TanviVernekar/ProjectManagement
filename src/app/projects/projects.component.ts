import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    
  }



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


  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      height: '60%',
      width: '28%',
     
      // panelClass: 'full-screen-modal',
     
    });
  }
}
