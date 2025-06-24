import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordService } from '../../../Services/password-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  email!: string;
  message: any;
  onSubmit() {
    this.passwordService.sendPasswordResetEmail(this.email).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
        this.snackBar.open(`${res.message}`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/']);
        this.snackBar.open(`$${err}`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
}
