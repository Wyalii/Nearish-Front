import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../Services/user-service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../Services/token-service';
import { Post } from '../../../interfaces/post';
import { PostCardComponent } from '../../post-card-component/post-card-component';
import { PasswordService } from '../../../Services/password-service';
import { PostService } from '../../../Services/posts-service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule, PostCardComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);
  private router = inject(Router);
  private passwordService = inject(PasswordService);
  private postService = inject(PostService);
  tokenService = inject(TokenService);
  loading = true;
  error: string = '';
  isLoggedIn = false;
  user: User | null = null;
  userPosts: Post[] = [];
  i: any;
  ngOnInit(): void {
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    this.viewPost();
  }

  viewPost() {
    this.postService.getCreatedPostsByUser().subscribe({
      next: (res) => {
        console.log(res);
        this.userPosts = res;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.error = 'Failed to load posts created by this user';
         this.snackBar.open(`${err.error.details}`, 'Dismiss', {
          duration: 5000,
        });
        this.loading = false;
      },
    });
  }
  goToForgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }
  goToFriends(){
    this.router.navigate(['/Friends'])
  }
}
