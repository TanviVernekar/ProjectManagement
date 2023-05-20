import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent implements OnInit {
  addForm!: FormGroup;

  designation: any;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private addemployeeservive: EmployeeService
  ) {}
  ngOnInit(): void {
    this.designationList();

    this.addForm = this.fb.group({
      name: new FormControl('', Validators.required),
      designationId: new FormControl(Validators.required),
      joiningDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.addemployeeservive.addEmployee(this.addForm.value);
    }
  }
  designationList() {
    this.addemployeeservive.getDesignationApi().subscribe((response) => {
      this.designation = response;
    });
  }
}
