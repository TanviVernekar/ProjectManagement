import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isDisabled: boolean = true;
  isLogin = false;
  submitted: boolean = false;

  loginForm!: FormGroup;

  signupusers: any = [];
  isUserExist: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServiceService,
    private ngZone: NgZone
  ) {}

  loginstatus: boolean = true;

  getLastAction() {
    return localStorage.getItem('lastAction');
  }

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
      setInterval(() => {
        if (localStorage.getItem('authstatus') === 'true') {
          this.check();
        }
      }, 1000);
    });
  }
  reset() {
    this.lastAction(Date.now());
  }
  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + environment.timer;

    const diff = timeLeft - now;

    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && localStorage.getItem('authstatus')) {
        localStorage.removeItem('lastAction');
        localStorage.setItem('authstatus', JSON.stringify(false));
        setTimeout(() => {
          console.log(
            'Your Session Expired due to longer Inactivity, Login Again To Continue'
          );
        }, 1000);

        localStorage.removeItem('peremployees');
        this.router.navigate(['']);
      }
    });
  }
  ngOnInit() {
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

    if (localdata != null) {
      this.signupusers = JSON.parse(localdata);
    }
  }
  login() {
    this.loginstatus = false;
  }

  receiveloginstatus($event: boolean) {
    this.loginstatus = $event;
  }

  onchange(data: any) {
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      let isUserExist;
      if (
        (isUserExist = this.signupusers.find(
          (m) =>
            m.email === this.loginForm.value.email &&
            m.password === this.loginForm.value.password
        ))
      ) {
        if (this.isUserExist !== null) {
          this.router.navigate(['/employee']);
          localStorage.setItem('authstatus', JSON.stringify(true));
          this.getLastAction();
          this.lastAction(Date.now());
          this.initListener();
          this.initInterval();
        }
      } else if (
        (isUserExist = this.signupusers.find(
          (m) =>
            m.email === this.loginForm.value.email &&
            m.password !== this.loginForm.value.password
        ))
      ) {
        alert('Password is incorrect!');
      } else {
        this.signupusers.push(this.loginForm.value);
        this.router.navigate(['/employee']);
        localStorage.setItem('signupusers', JSON.stringify(this.signupusers));
        localStorage.setItem('authstatus', JSON.stringify(true));
        this.getLastAction();
        this.lastAction(Date.now());
        this.initListener();
        this.initInterval();
      }
    }
  }
}
