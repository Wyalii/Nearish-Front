import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly baseUrl =
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Auth/';
  constructor(private http: HttpClient) {}
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}ForgotPassword`, { email });
  }

  resetPassword(newPassword: string, token: string | null): Observable<any> {
    return this.http.post(`${this.baseUrl}ResetPassword`, {
      newPassword,
      token,
    });
  }
}
