import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../../interfaces/user-login';
import { AuthService } from '../../../Services/AuthService';
import { TokenService } from '../../../Services/token-service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginPage {
  constructor(private api: AuthService, private router: Router) {}
  tokenService = inject(TokenService);

  user: UserLogin = {
    email: '',
    password: '',
  };

  loginFunc(): void {
    this.api.login(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Login successful!');
          1;

          const token =
            typeof res.data === 'string' ? res.data : res.data?.token;

          if (token) {
            this.tokenService.setToken(token);
          }

          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Error: ' + (err.error?.message || 'Something went wrong.'));
      },
    });
  }
  private extractExpiryFromMessage(message: string): Date | null {
    const match = message.match(/Token Expires At:\s*(.+)/);
    if (!match || !match[1]) return null;

    const date = new Date(match[1].trim());
    return isNaN(date.getTime()) ? null : date;
  }
}
