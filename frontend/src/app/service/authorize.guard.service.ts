import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor( private router: Router, private UserService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.UserService.getCurrentUser().user;

      if (user != null && user.role.toString() === 'docteur' ) {      
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
  }
}