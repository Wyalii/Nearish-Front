import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user-service';
import { map, filter, take } from 'rxjs/operators';

export const selfProfileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const targetUserId = Number(route.paramMap.get('id'));

  return userService.user$.pipe(
    filter((user) => user !== null),
    take(1),
    map((user) => {
      if (user?.id === targetUserId) {
        router.navigate(['/profile']);
        return false;
      }
      return true;
    })
  );
};
