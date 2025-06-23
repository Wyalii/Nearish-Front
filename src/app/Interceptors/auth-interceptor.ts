import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from '../Services/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const token = tokenService.getTokenFromLocalStorage();
  const excludedUrls = [
    'https://nearish-back.onrender.com/api/Post/get all posts',
    'https://nearish-back.onrender.com/api/Post/GetLikedPosts',
    'https://nearish-back.onrender.com/api/Post/GetPost',
    'https://nearish-back.onrender.com/api/FriendRequest/get',
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
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
