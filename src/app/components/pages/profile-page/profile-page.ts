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
  tokenService = inject(TokenService);
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
  }

  viewPost(arg0: any) {
    throw new Error('Method not implemented.');
  }
  forgotPassword() {
    throw new Error('Method not implemented.');
  }
  changePassword() {
    throw new Error('Method not implemented.');
  }
}
