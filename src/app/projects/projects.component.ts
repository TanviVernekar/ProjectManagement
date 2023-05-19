import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { ProjectList } from '../interface/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private projectservice:ProjectService
  ) {}

  filterstring: string = '';

  openemp: boolean = false;
  perproject: any;

  peremployee: any;

  status: any;

  ngOnInit(): void {
    this.projectListDetails();
    localStorage.removeItem('peremployees');
  }

  logoutStatus: boolean = false;
  projectList!: ProjectList[];
  term: string;

  logout() {
    this.logoutStatus = true;
    localStorage.setItem('authstatus', JSON.stringify(false));
    this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      height: '60%',
      width: '28%',
    });
  }

  openempDetail(data) {
    this.perproject = data;
  }
  handlechange() {
    this.openemp = false;
    console.log(this.openemp);
  }

  list() {
    if (this.projectList.length > 0) {
      if (this.projectList[0] != null) {
        this.perproject = this.projectList[0];
      }
    }
  }

  handleEvent(details) {
    this.peremployee = details;
    localStorage.setItem('peremployees', JSON.stringify(this.peremployee));
    this.router.navigate(['/employee']);
  }

  projectListDetails() {
    this.projectservice.getProjectListApi().subscribe((response:ProjectList[]) => {
      this.projectList = response;
      console.log("?????",response)
      if (this.projectList) {
        this.list();
      }
    });
  }

  projectStatus(body) {
    this.projectservice.addProjectStatusApi(body).subscribe((response) => {
      this.status = response;
      this.projectservice.getProjectListApi().subscribe((response:ProjectList[]) => {
        this.projectList = response;
        this.projectList.map((ele) => {
          if (ele.id === this.perproject.id) {
            this.perproject = ele;
          }
        });
      });
    });
  }
}
