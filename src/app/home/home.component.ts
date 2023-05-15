import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isDisabled:boolean=true
logout:boolean=false

loginForm! : FormGroup;



signupusers:any=[]; 
isUserExist :any;
// loginForm = new FormGroup({
//   email: new FormControl(''),
//   password: new FormControl(''),
// })
// LoginForm = this.fb.group({
//   email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
//   password: [''],
 
// });
constructor(private fb: FormBuilder,private router:Router,private service:ServiceService) { }


loginstatus:boolean;
ngOnInit(){
 
  this.loginForm = this.fb.group({
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
   
  });


  const localdata = localStorage.getItem('signupusers');
  console.log("local data",localdata)
  if(localdata != null){
    this.signupusers = JSON.parse(localdata);
  }
}
// login(){
//   this.loginButton=false
// }
receiveloginstatus($event:boolean){

  this.loginstatus=$event
  console.log('recive',this.loginstatus)
}

onSubmit() {
  console.log(this.loginForm.value.password);
  // console.log(this.loginForm.status)

  this.logout=true
  this.service.setLogStatus(this.logout)
  console.log("logout",this.logout)

let isUserExist
  if( isUserExist = this.signupusers.find(m => m.email === this.loginForm.value.email && m.password === this.loginForm.value.password)){
    console.log("login",this.signupusers)
    if(this.isUserExist !== null){
      console.log('sucess')
      this.router.navigate(['/employee']);
    }
  }else if(isUserExist = this.signupusers.find(m => m.email === this.loginForm.value.email && m.password !== this.loginForm.value.password)){
    alert('please enter valid password')
  }
  else{
    this.signupusers.push(this.loginForm.value)
    console.log("array",this.signupusers)
    console.log('register')
    localStorage.setItem('signupusers',JSON.stringify(this.signupusers))
    this.router.navigate(['/employee']);
  }
 


  
}


}

