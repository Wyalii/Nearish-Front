import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/token-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../Services/user-service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-header-component',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  tokenService = inject(TokenService);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);
  private router = inject(Router);
  user: User | null = null;
  profileImage: string = '';
  ngOnInit(): void {
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.user?.profileImage;
      console.log(this.user);
    });
  }

  logout() {
    this.tokenService.removeTokenFromLocalStorage();
    this.snackBar.open('Logged Out!', 'Dismiss', {
      duration: 5000,
    });
  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.user?.name]);
  }
}
