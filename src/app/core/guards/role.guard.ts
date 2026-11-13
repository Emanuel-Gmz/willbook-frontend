import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/user';

export const roleGuard: CanActivateFn = (route) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) return true;

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    authService.logout();
    return router.createUrlTree(['/auth/login']);
  }

  const expectedRoles = route.data['roles'] as Role[];

  if (expectedRoles && !authService.hasRole(expectedRoles)) {
    return router.createUrlTree(['/catalogo']);
  }

  return true;
};