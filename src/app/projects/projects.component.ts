import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { ProjectList } from '../interface/project';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

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
    private projectservice: ProjectService
  ) {}

  filterstring: string = '';

  openemp: boolean = false;
  perproject: any;

  peremployee: any;

  status: any;
  sub = new Subscription();

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
      data: {
        projectListDetails: this.projectListDetails.bind(this),
      },
      height: '60%',
      width: '28%',
    });
  }

  openempDetail(data) {
    this.perproject = data;
  }
  handlechange() {
    this.openemp = false;
  }

  list() {
    if (this.projectList.length > 0) {
      if (this.projectList[0] != null) {
        this.perproject = this.projectList[0];
      }
    }
  }

  projectListDetails() {
    this.projectservice.getProjectListApi();
    this.sub = this.projectservice.projectLists.subscribe(
      (res: ProjectList[]) => {
        this.projectList = res;
        if (this.projectList) {
          this.list();
        }
        this.sub.unsubscribe();
      }
    );
  }

  addItem(newItem: ProjectList[]) {
    this.projectList = newItem;
  }
  addPerProject(newItem: any) {
    this.perproject = newItem;
  }
}
