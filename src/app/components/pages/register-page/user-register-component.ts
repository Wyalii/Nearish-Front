import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { register } from '../../../interfaces/register';
import { AuthService } from '../../../Services/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../../../Services/file-service';

@Component({
  selector: 'app-user-register-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-register-component.html',
  styleUrls: ['./user-register-component.css'],
})
export class RegisterPage {
  user: register = {
    name: '',
    email: '',
    password: '',
    profileImage: '',
  };

  constructor(
    private api: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private fileService: FileService
  ) {}
  private snackBar = inject(MatSnackBar);
  loading: boolean = false;
  imageUploading: boolean = false;
  async handleFileUpload(event: Event, type: string) {
    this.imageUploading = true;
    const uploadedUrl = await this.fileService.uploadFile(event, 'image');
    if (uploadedUrl) {
      this.user.profileImage = uploadedUrl;
    } else {
      this.snackBar.open('File upload failed. Please try again.', 'Dismiss', {
        duration: 4000,
      });
    }
    this.imageUploading = false;
  }
  private extractExpiryFromMessage(message: string): Date | null {
    const match = message.match(/Token Expires At:\s*(.+)/);
    if (!match || !match[1]) return null;

    const date = new Date(match[1].trim());
    return isNaN(date.getTime()) ? null : date;
  }

  registerFunc(): void {
    this.loading = true;
    this.api.register(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          const token = res.data;
          const expires = this.extractExpiryFromMessage(res.message || '');

          if (token) {
            this.cookieService.set('accessToken', token, {
              path: '/',
              expires: expires || 1,
            });
          }
          this.loading = false;
          this.router.navigate(['/']);
          this.snackBar.open('Succesfully Registered Check Email!', 'Dismiss', {
            duration: 5000,
          });
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.snackBar.open('User Already Exists!', 'Dismiss', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('Something Went Wrong!', 'Dismiss', {
            duration: 5000,
          });
        }
      },
    });
  }
}
