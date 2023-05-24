import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EmployeeList } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  addProjForm!: FormGroup;
  employeeList: EmployeeList[];
  selectedId: any = [];
  submitted: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private employeeservice: EmployeeService,
    private addprojectservice: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.employeeListDetails();
    this.addProjForm = this.fb.group({
      name: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
    });

    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }

  onSubmit() {
    this.submitted = true;
    const body = {
      ...this.addProjForm.value,
      employees: this.selectedId,
    };
    this.addprojectservice.addProject(body)
    
  }

  onItemSelect(item: any) {
    this.selectedId.push(item.id);
  }
  onItemDeSelect(item: any) {
    const index = this.selectedId.indexOf(item.id);

    const element = this.selectedId.splice(index, 1);
  }

  employeeListDetails() {
    // this.employeeservice.getEmpListApi();
    this.employeeservice.employeeArray$.subscribe((res) => {
      this.employeeList = res;
    });
  }
}
