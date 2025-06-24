import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token-service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getTokenFromLocalStorage();
  if (token) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
