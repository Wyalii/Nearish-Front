import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../../interfaces/user-login';
import { AuthService } from '../../../Services/AuthService';
import { TokenService } from '../../../Services/token-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginPage {
  constructor(private api: AuthService, private router: Router) {}
  tokenService = inject(TokenService);
  private snackBar = inject(MatSnackBar);
  user: UserLogin = {
    email: '',
    password: '',
  };
  loading: boolean = false;

  loginFunc(): void {
    this.loading = true;
    this.api.login(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          const token =
            typeof res.data === 'string' ? res.data : res.data?.token;

          if (token) {
            this.tokenService.setToken(token);
          }
          this.loading = false;
          this.router.navigate(['/']);
          this.snackBar.open('Succesfully Logged in!', 'Dismiss', {
            duration: 5000,
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Something went wrong!', 'Dismiss', {
          duration: 5000,
        });
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
