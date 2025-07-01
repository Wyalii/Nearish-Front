import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { register } from '../interfaces/register';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { UserLogin } from '../interfaces/user-login';
import { UserVerify } from '../interfaces/user-verify';
import { TokenService } from './token-service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl =
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/';
  private tokenService = inject(TokenService);
  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getTokenFromLocalStorage();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  register(registerBody: register): Observable<BaseResponceInterface> {
    return this.http.post<BaseResponceInterface>(
      this.baseUrl + 'Auth/register',
      registerBody
    );
  }

  login(body: UserLogin): Observable<BaseResponceInterface> {
    return this.http.post<BaseResponceInterface>(
      this.baseUrl + 'Auth/login',
      body
    );
  }

  verify(body: UserVerify): Observable<BaseResponceInterface> {
    return this.http.post<BaseResponceInterface>(
      this.baseUrl + 'Auth/verify',
      body
    );
  }
  getUser(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(`${this.baseUrl}Auth/GetUser`, null, {
      headers,
    });
  }
}
