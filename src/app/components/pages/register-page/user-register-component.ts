import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { register } from '../../../interfaces/register';
import { AuthService } from '../../../Services/AuthService';

@Component({
  selector: 'app-user-register-component',
  standalone: true,                  
  imports: [CommonModule, FormsModule], 
  templateUrl: './user-register-component.html',
  styleUrls: ['./user-register-component.css']
})
export class RegisterPage {
  user: register = {
    name: '',
    email: '',
    password: '',
    imageUrl: ''
  };

  constructor(
    private api: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  private extractExpiryFromMessage(message: string): Date | null {
    const match = message.match(/Token Expires At:\s*(.+)/);
    if (!match || !match[1]) return null;

    const date = new Date(match[1].trim());
    return isNaN(date.getTime()) ? null : date;
  }

  registerFunc(): void {
    this.api.register(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Registration successful!');

          const token = res.data;
          const expires = this.extractExpiryFromMessage(res.message || '');

          if (token) {
            this.cookieService.set('accessToken', token, {
              path: '/',
              expires: expires || 1
            });
          }

          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if (err.status === 409) {
          alert('User already exists.');
        } else {
          alert('Error: ' + (err.error?.message || 'Something went wrong.'));
        }
      }
    });
  }
}