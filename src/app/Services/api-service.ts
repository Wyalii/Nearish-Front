
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { register } from '../interfaces/register';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { UserLogin } from '../interfaces/user-login';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://nearish-back.onrender.com/api/';

  
  register(registerBody: register): Observable<BaseResponceInterface> {
    return this.http.post<BaseResponceInterface>(this.baseUrl + 'Auth/register', registerBody);
  }


 login(body: UserLogin): Observable<BaseResponceInterface> {
  return this.http.post<BaseResponceInterface>(this.baseUrl + 'Auth/login', body);
}

}