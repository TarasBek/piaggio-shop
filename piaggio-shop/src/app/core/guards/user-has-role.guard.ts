// src/app/core/guards/user-has-role.guard.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/ auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserHasRoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['allowedRoles'] as string[];

    if (!this.auth.isLoggedIn()) {
      return this.router.createUrlTree(['/auth/login']);
    }

    const user = this.auth.getUser();
    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    // Unauthorized → redirect to catalog
    return this.router.createUrlTree(['/catalog']);
  }
}
