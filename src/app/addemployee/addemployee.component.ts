import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent implements OnInit {
  addForm!: FormGroup;

  designation: any;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: ServiceService) {}
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
    console.log(this.addForm.value);
    console.log(this.addForm.status);
    console.log('I am clicked  ');
    this.submitted = true;
    if (this.addForm.valid) {
      this.service.addEmployee(this.addForm.value).subscribe((response) => {
        console.log(response);
        window.location.reload();

      });
    }
  }
  designationList() {
    this.service.getDesignationApi().subscribe((response) => {
      this.designation = response;
    });
  }
}
