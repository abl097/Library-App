import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user:UserService , private route:Router){}
  canActivate():boolean{
    if(this.user.logedin()){
      return true
    }else{
      this.route.navigate([''])
      return false
    }
  }
   
  
  
}
