import { Component } from '@angular/core';
import { ApiService } from '../../Services/api-service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserLogin } from '../../interfaces/user-login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
constructor(
    private api: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  user: UserLogin = {
    email: '',
    password: ''
  };

  loginFunc(): void {
    this.api.login(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Login successful!');

          const token = res.data;
          const expires = this.extractExpiryFromMessage(res.message || '');

          if (token) {
            this.cookieService.set('accessToken', token, {
              path: '/',
              expires: expires || 1
            });
          }

          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        alert('Error: ' + (err.error?.message || 'Something went wrong.'));
      }
    });
  }

  private extractExpiryFromMessage(message: string): Date | null {
    const match = message.match(/Token Expires At:\s*(.+)/);
    if (!match || !match[1]) return null;

    const date = new Date(match[1].trim());
    return isNaN(date.getTime()) ? null : date;
  }
}
