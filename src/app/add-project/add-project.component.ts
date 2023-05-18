import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  addProjForm!: FormGroup;

  employeeList: any = [];
  selectedId: any = [];

  submitted: boolean = false;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private fb: FormBuilder, private service: ServiceService) {}
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

    this.service.addProject(body).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });
  }

  onItemSelect(item: any) {
    this.selectedId.push(item.id);
  }
  onItemDeSelect(item: any) {
    const index = this.selectedId.indexOf(item.id);

    const element = this.selectedId.splice(index, 1);
  }

  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
    });
  }



}
