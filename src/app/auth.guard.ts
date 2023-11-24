// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { FormDataService } from './form-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private formDataService: FormDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Check if the user has submitted the form
    if (this.formDataService.hasSubmitted()) {
      return true;
    }

    // If not, redirect to the form page
    alert("Add Details & Click On Submit for UserList");
    return this.router.createUrlTree(['/form']);
  }
}
