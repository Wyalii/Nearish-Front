import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = 'accessToken';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._isLoggedIn$.next(true);
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
  }
}
