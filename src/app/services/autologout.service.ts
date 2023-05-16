import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  isLogin = false;

  constructor(
      private router: Router,
      private ngZone: NgZone
  ) {
    if(localStorage.getItem('authstatus')){
      this.isLogin=true;
    }
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    })
  }

  /**
   * reset timer
   */
  reset() {
    this.lastAction(Date.now());
  }

  /**
   * check timer
   */
  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + (5) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout && this.isLogin) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('lastAction');
        setTimeout(()=>{
          console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        },1000);
        this.router.navigate(['']);
      }
    });
  }
}
