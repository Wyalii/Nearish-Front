import { Component, inject, OnInit } from '@angular/core';
import { FriendRequestService } from '../../../Services/friend-request-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list-page',
  imports: [CommonModule],
  templateUrl: './friends-list-page.html',
  styleUrl: './friends-list-page.css',
})
export class FriendsListPage implements OnInit {
  friendRequests: any[] = [];
  private requestService = inject(FriendRequestService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadFriendsList();
  }
  loadFriendsList(): void {
    this.requestService.getFriends().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.friendRequests = (res as any).data || [];
      },
      error: () => {
        this.snackBar.open('Failed to load friends.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  goToChat(userId: number) {
    this.router.navigate(['/chat', userId]);
  }
}
