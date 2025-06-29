import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from '../Services/token-service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const token = tokenService.getTokenFromLocalStorage();
  const snackBar = inject(MatSnackBar);
  const excludedUrls = [
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Post/get all posts',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Post/GetLikedPosts',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Post/GetPost',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/FriendRequest/get',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/FriendRequest',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Auth/Users',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Search/users',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Post/GetCreatedPostsByUser',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/chathub',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/notificationshub',
    'https://nearish-back-bkbjdrfhbnhafecm.westeurope-01.azurewebsites.net/api/Auth/ForgotPassword',
  ];

  const shouldSkip = excludedUrls.some((url) => req.url.includes(url));

  if (shouldSkip) {
    return next(req);
  }
  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || 403) {
        tokenService.removeTokenFromLocalStorage();
        snackBar.open(
          'Your session has expired. Please log in again.',
          'Close',
          {
            duration: 4000,
          }
        );
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
