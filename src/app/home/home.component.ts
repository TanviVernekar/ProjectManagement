import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isDisabled:boolean=true
loginButton:boolean=false
loginForm! : FormGroup;
// loginForm = new FormGroup({
//   email: new FormControl(''),
//   password: new FormControl(''),
// })
// LoginForm = this.fb.group({
//   email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
//   password: [''],
 
// });
constructor(private fb: FormBuilder,private router:Router) { }



ngOnInit(){
  this.loginForm = this.fb.group({
    'email': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'password': new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
   
  });
}
login(){
  this.loginButton=false
}


onSubmit() {
  console.log(this.loginForm.value);
  console.log(this.loginForm.status)
  console.log("I am clicked  ")
  this.router.navigate(['tabnavigation'])
}
}
