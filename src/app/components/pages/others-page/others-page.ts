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
  loggedInUserId: number | undefined = undefined;
  showFriendRequestButton = false;
  user: User | undefined = undefined;
  userPosts: Post[] = [];
  loading = false;
  error = '';
  userId!: string | null;
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) return;

    this.loading = true;

    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res.data;
        this.fetchUserPosts();
        this.loading = false;
        this.userService.user$.subscribe((u) => {
          if (!u || u.id === this.user?.id) return;
          this.firendRequestService
            .isFriend(this.user?.id!)
            .subscribe((isFriend) => {
              this.showFriendRequestButton = !isFriend;
            });
        });
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
        console.log('Friend request sent successfully!');
      },
      error: (err) => {
        console.error('Failed to send friend request:', err);
      },
    });
  }
}
