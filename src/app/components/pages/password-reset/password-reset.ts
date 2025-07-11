import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../../../Services/password-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset {
  token: string | null = null;
  private route = inject(ActivatedRoute);
  private passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  newPassword = '';
  confirmPassword = '';
  resetMessage = '';

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Reset token:', this.token);
  }

  changePassword() {
    this.passwordService.resetPassword(this.newPassword, this.token).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
        this.snackBar.open(`${res.message}`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
        this.router.navigate(['/']);
        this.snackBar.open(`passwords dont match`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
}
