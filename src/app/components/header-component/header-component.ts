import { Component, inject, OnInit, HostListener } from '@angular/core';
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
  menuOpen = false;

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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.tokenService.removeTokenFromLocalStorage();
    this.snackBar.open('Logged Out!', 'Dismiss', {
      duration: 5000,
    });
    this.menuOpen = false;
  }

  goToProfilePage() {
    if (this.user?.name) {
      this.router.navigate(['/profile', this.user.name]);
    } else {
      console.warn('User is not loaded or has no name');
      this.snackBar.open('User profile is not available yet.', 'Dismiss', {
        duration: 4000,
      });
    }
    this.router.navigate(['/profile', this.user?.name]);
    this.menuOpen = false;
  }

  goToFriendRequest() {
    this.router.navigate(['/friendRequests']);
    this.menuOpen = false;
  }

  goToPostCreate() {
    this.router.navigate(['/create-post']);
  }

  goToFrientsList() {
    this.router.navigate(['/Friends']);
  }
  goToMainPage() {
    this.router.navigate(['/']);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.menuOpen) return;

    const target = event.target as HTMLElement;

    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger');

    if (
      burgerMenu &&
      burgerIcon &&
      !burgerMenu.contains(target) &&
      !burgerIcon.contains(target)
    ) {
      this.menuOpen = false;
    }
  }
  goToSearchPage() {
    this.router.navigate(['/searchPage']);
  }
}
