import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token-service';
import { User } from '../interfaces/user';
import { getUserInterface } from '../interfaces/getUser-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private baseUrl = 'https://nearish-back.onrender.com/api/';
  private userSubject = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getTokenFromLocalStorage();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  loadUser(): void {
    if (this.tokenService.getTokenFromLocalStorage() === null) {
      console.log('no token');
      return;
    }
    const headers = this.getAuthHeaders();
    this.http
      .post<getUserInterface>(`${this.baseUrl}Auth/GetUser`, {}, { headers })
      .subscribe({
        next: (user) => this.userSubject.next(user.user),
        error: (err) => {
          console.error('Failed to load user:', err);
          this.userSubject.next(null);
        },
      });
  }

  getUserById(userId: string | null): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}Auth/Users/${userId}`);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}
