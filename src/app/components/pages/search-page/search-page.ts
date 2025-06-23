import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../Services/search-service';
import { Router } from '@angular/router';
import { FriendRequestService } from '../../../Services/friend-request-service';
import { SendFriendRequest } from '../../../interfaces/send-friend-request';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  searchService = inject(SearchService);
  private router = inject(Router);
  private firendRequestService = inject(FriendRequestService);
  searchQuery = '';
  results: any[] = [];
  onSearch() {
    this.searchService.searchUsers(this.searchQuery).subscribe({
      next: (res) => {
        this.results = res.data;
        console.log(this.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  sendFriendRequest(receiverId: number) {
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
  viewProfile(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
