import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  addProjForm!: FormGroup;

  employeeList:any=[]
  selectedId: any = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  employees = [
    {
      id: 1,
      name: 'employee1',
    },
    {
      id: 2,
      name: 'employee2',
    },
    {
      id: 3,
      name: 'employee2',
    },
  ];
  constructor(private fb: FormBuilder, private service: ServiceService) {}
  ngOnInit(): void {

    this.employeeListDetails()


    this.addProjForm = this.fb.group({
      name: new FormControl('',Validators.required),
      technologies: new FormControl('',Validators.required),
      startDate: new FormControl('',Validators.required),
      employees: new FormControl('',Validators.required),
    });
    
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }

  onSubmit() {

    const body = {
      ...this.addProjForm.value,
      employees:this.selectedId
    }
  console.log("body",body);
  
    this.service.addProject(body).subscribe((response)=>{
      console.log(response)
          })
  }


  onItemSelect(item: any) {
    console.log('onItemSelect', item.id);
    this.selectedId.push(item.id);
    console.log(this.selectedId);
  }
  onItemDeSelect(item: any) {
    const index = this.selectedId.indexOf(item.id);
    console.log("index",index)
  const element = this.selectedId.splice(index,1);
  console.log(this.selectedId)
  }


  employeeListDetails() {
    this.service.getEmpListApi().subscribe((response) => {
      this.employeeList = response;
      console.log("projresss",this.employeeList);
    });
  }
}
