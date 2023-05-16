import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  addProjForm! : FormGroup;

 employees=[
  {
    id:1,
    name:'employee1'
  },
  {
    id:2,
    name:'employee2'
  },
  {
    id:3,
    name:'employee2'
  },
 ]
  constructor(private fb: FormBuilder,private service:ServiceService) { }
  ngOnInit(): void {
    this.addProjForm = this.fb.group({
      'name': new FormControl(''),
      'technologies': new FormControl(''),
      'startDate': new FormControl(''),
      'employees': new FormControl(''), 
    });
    
  }


  onSubmit() {
    console.log(this.addProjForm.value);
    console.log(this.addProjForm.status)
    console.log("I am clicked  ")
    this.service.addProject( this.addProjForm.value).subscribe((response)=>{
      console.log(response)
          })
    
  }
}
