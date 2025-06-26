import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user-service';
import { PostService } from '../../../Services/posts-service';
import { User } from '../../../interfaces/user';
import { Post } from '../../../interfaces/post';
import { PostCardComponent } from '../../post-card-component/post-card-component';
import { SendFriendRequest } from '../../../interfaces/send-friend-request';
import { FriendRequestService } from '../../../Services/friend-request-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-others-page',
  imports: [CommonModule, FormsModule, PostCardComponent],
  templateUrl: './others-page.html',
  styleUrl: './others-page.css',
})
export class OthersPage implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private postService = inject(PostService);
  private firendRequestService = inject(FriendRequestService);
  private snackBar = inject(MatSnackBar);
  loggedInUserId: number | undefined = undefined;
  showFriendRequestButton = true;
  user: User | undefined = undefined;
  userPosts: Post[] = [];
  loading = false;
  error = '';
  userId!: string | null;
  isFriend: any;
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) return;

    this.loading = true;

    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res.data;
        this.fetchUserPosts();
        this.firendRequestService
          .isFriend(this.user?.id!)
          .subscribe((isFriend) => {
            console.log(isFriend);
            this.isFriend = isFriend;
            this.showFriendRequestButton = !isFriend;
          });
        this.loading = false;
      },
      error: () => {
        this.error = 'User not found.';
        this.loading = false;
      },
    });
  }

  fetchUserPosts(): void {
    this.postService.getCreatedPostsById(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userPosts = res;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.error = 'Failed to load posts created by this user';
        this.loading = false;
      },
    });
  }

  sendFriendRequest(receiverId: number | undefined) {
    const dto: SendFriendRequest = { reciver_Id: receiverId };
    this.firendRequestService.sendRequest(dto).subscribe({
      next: () => {
        this.snackBar.open('Succesfully sent friend request!', 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
        this.snackBar.open(`${err.error.message}`, 'Dismiss', {
          duration: 5000,
        });
        console.error('Failed to send friend request:', err);
      },
    });
    this.showFriendRequestButton = false;
  }
}
