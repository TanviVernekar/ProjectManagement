import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectList } from '../interface/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(private projectservice: ProjectService, private router: Router) {}

  @Input('perproject') perproject: any;
  @Input('projectList') projectList: ProjectList[];

  @Output() newItemEvent = new EventEmitter<ProjectList[]>();
  @Output() newPerProject = new EventEmitter<any>();

  peremployee: any;
  status: any;

  ngOnInit(): void {}

  projectStatus(body) {
    this.projectservice.addProjectStatusApi(body).subscribe((response) => {
      this.status = response;
      this.projectservice.projectLists.subscribe((res: ProjectList[]) => {
        this.projectList = res;
        this.newItemEvent.emit(this.projectList);
        this.projectList.map((ele) => {
          if (ele.id === this.perproject.id) {
            this.newPerProject.emit(ele);
            // this.perproject = ele;
          }
        });
      });
      this.projectservice.getProjectListApi();
    });
  }
  handleEvent(details) {
    this.peremployee = details;
    localStorage.setItem('peremployees', JSON.stringify(this.peremployee));
    this.router.navigate(['/employee']);
  }
}
