import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../../../Services/password-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
