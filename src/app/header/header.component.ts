import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loginButton:boolean=true
  // logoutbtn:boolean=false
  logoutStatus:boolean
constructor(private service:ServiceService,private router:Router){}
// @Input() logouts:boolean
 @Output() event =new EventEmitter<boolean>()
  ngOnInit(): void {
    this.event.emit(this.loginButton)
   this.logoutStatus= this.service.getLogstatus()
   
  }


  login(){
    
    this.loginButton=false
    this.event.emit(this.loginButton)

  }

  logout(){
    // localStorage.removeItem()
    // alert('clicked')
    this.loginButton=true
    this.event.emit(this.loginButton)
  // this.logoutStatus = false
  console.log("lgsts",this.logoutStatus)
    this.router.navigate(['']);
  }
  // refresh() {
  //     window.location.reload();
      
  // }

}
