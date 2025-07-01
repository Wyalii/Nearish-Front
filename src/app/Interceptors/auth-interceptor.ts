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
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Post/get all posts',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Post/GetLikedPosts',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Post/GetPost',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/FriendRequest/get',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/FriendRequest',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Auth/Users',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Search/users',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Post/GetCreatedPostsByUser',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/chathub',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/notificationshub',
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Auth/ForgotPassword',
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
