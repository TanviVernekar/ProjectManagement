import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit{

  addForm! : FormGroup;


  designation=[
    {
        "id": 1,
        "name": "Developer"
    },
    {
        "id": 2,
        "name": "QA"
    },
    {
        "id": 3,
        "name": "Manager"
    },
    {
        "id": 4,
        "name": "TL"
    },
    {
        "id": 5,
        "name": "TA"
    }
]

  constructor(private fb: FormBuilder,private service:ServiceService) { }
  ngOnInit(): void {
    this.addForm = this.fb.group({
      'name': new FormControl(''),
      'designationId': new FormControl(),
      'joiningDate': new FormControl(''),
      'technologies': new FormControl(''), 
    });
  }


  onSubmit() {
    console.log(this.addForm.value);
    console.log(this.addForm.status)
    console.log("I am clicked  ")
    
    this.service.addEmployee(this.addForm.value).subscribe((response)=>{
console.log(response)
    })
    
  }
}
