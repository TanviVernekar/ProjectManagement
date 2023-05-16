import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}
  canActivate():any
    {
      const status =  localStorage.getItem('authstatus')
      if(localStorage.getItem('authstatus')=== 'true'){
        return true;
      }
      else{
        this.router.navigate(['']);
        return false;
      }
  }
  
}
