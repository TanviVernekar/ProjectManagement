import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  addProjForm! : FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.addProjForm = this.fb.group({
      'name': new FormControl(''),
      'designation': new FormControl(''),
      'joiningdate': new FormControl(''),
      'technologies': new FormControl(''), 
    });
  }


  onSubmit() {
    console.log(this.addProjForm.value);
    console.log(this.addProjForm.status)
    console.log("I am clicked  ")
    
  }
}
