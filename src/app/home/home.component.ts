import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService } from '../services/service.service';
import { AutologoutService } from '../services/autologout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isDisabled: boolean = true;
  isLogin = false;
  submitted: boolean = false;

  // logout:boolean=false

  //  authstatus:boolean = true;
  loginForm!: FormGroup;

  signupusers: any = [];
  isUserExist: any;
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // })
  // LoginForm = this.fb.group({
  //   email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
  //   password: [''],

  // });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServiceService,
    private ngZone: NgZone
  ) {
    // if(this.status){
    //   this.isLogin=true;
    //   console.log("loginstatus",this.isLogin)
    // }
    // this.lastAction(Date.now());
    // this.check();
    // this.initListener();
    // this.initInterval();
  }

  loginstatus: boolean = true;

  getLastAction() {
    return localStorage.getItem('lastAction');
  }
  // @param value
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      // document.body.addEventListener('click', () => this.reset());
    });
  }
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      // if(localStorage.getItem('lastAction')){
      setInterval(() => {
        if (localStorage.getItem('authstatus') === 'true') {
          console.log('checked', localStorage.getItem('authstatus'));
          this.check();
        }
      }, 1000);
      // }
    });
  }
  reset() {
    this.lastAction(Date.now());
  }
  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + 10 * 60 * 1000;
    console.log('tl', timeLeft);
    const diff = timeLeft - now;
    console.log(diff);
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout && localStorage.getItem('authstatus')) {
        // localStorage.removeItem('user_id');
        localStorage.removeItem('lastAction');
        localStorage.setItem('authstatus', JSON.stringify(false));
        setTimeout(() => {
          console.log(
            'Your Session Expired due to longer Inactivity, Login Again To Continue'
          );
        }, 1000);
        console.log('diff', diff);

        this.router.navigate(['']);
      }
    });
  }
  ngOnInit() {
    // this.status=localStorage.getItem('authstatus')

    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
    });

    const localdata = localStorage.getItem('signupusers');
    console.log('local data', localdata);
    if (localdata != null) {
      this.signupusers = JSON.parse(localdata);
    }
  }
  login() {
    this.loginstatus = false;
  }

  receiveloginstatus($event: boolean) {
    this.loginstatus = $event;
    console.log('recive', this.loginstatus);
  }

  onchange(data: any) {
    this.submitted = false;
    console.log(this.loginForm.value.email);
  }

  onSubmit() {
    // console.log(this.loginForm.value.password);

    this.submitted = true;
    // console.log(this.loginForm.status)

    // this.logout=true
    // this.service.setLogStatus(this.logout)
    // console.log("logout",this.logout)
    if (this.loginForm.valid) {
      let isUserExist;
      if (
        (isUserExist = this.signupusers.find(
          (m) =>
            m.email === this.loginForm.value.email &&
            m.password === this.loginForm.value.password
        ))
      ) {
        console.log('login', this.signupusers);
        if (this.isUserExist !== null) {
          console.log('sucess');
          this.router.navigate(['/employee']);
          localStorage.setItem('authstatus', JSON.stringify(true));
          this.getLastAction();
          this.lastAction(Date.now());
          this.initListener();
          this.initInterval();
          // this.reset()
          // this.check()
        }
      } else if (
        (isUserExist = this.signupusers.find(
          (m) =>
            m.email === this.loginForm.value.email &&
            m.password !== this.loginForm.value.password
        ))
      ) {
        alert('please enter valid password');
      } else {
        this.signupusers.push(this.loginForm.value);
        console.log('array', this.signupusers);
        console.log('register');
        this.router.navigate(['/employee']);
        localStorage.setItem('signupusers', JSON.stringify(this.signupusers));
        localStorage.setItem('authstatus', JSON.stringify(true));
        this.getLastAction();
        this.lastAction(Date.now());
        this.initListener();
        this.initInterval();
        // this.reset()
        // this.check()
      }
    }
  }
}
