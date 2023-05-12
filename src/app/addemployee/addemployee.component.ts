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
  constructor(private fb: FormBuilder,private service:ServiceService) { }
  ngOnInit(): void {
    this.addForm = this.fb.group({
      'name': new FormControl(''),
      'designation': new FormControl(''),
      'joiningDate': new FormControl(''),
      'technologies': new FormControl(''), 
    });
  }


  onSubmit() {
    console.log(this.addForm.value);
    console.log(this.addForm.status)
    console.log("I am clicked  ")
    this.service.addEmployee( this.addForm.value).subscribe((response)=>{
console.log(response)
    })
    
  }
}
