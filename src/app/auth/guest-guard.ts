import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token-service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.getTokenFromLocalStorage()) {
    router.navigate(['/profile']);
    return false;
  }
  return true;
};
