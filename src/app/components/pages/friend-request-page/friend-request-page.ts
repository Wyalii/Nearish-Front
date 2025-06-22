import { Component, OnInit } from '@angular/core';
import { FriendRequest } from '../../../interfaces/friend-request';
import { FriendRequestService } from '../../../Services/friend-request-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-request-page',
  imports: [RouterModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './friend-request-page.html',
  styleUrl: './friend-request-page.css'
})
export class FriendRequestPage implements OnInit {
friendRequests: FriendRequest[] = [];

  constructor(
    private requestService: FriendRequestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
  this.requestService.getReceivedRequests().subscribe({
    next: (res) => {
      console.log(res); 
     this.friendRequests = (res as any).friendRequests;
    },
    error: () => {
      this.snackBar.open('Failed to load requests.', 'Close', { duration: 3000 });
    },
  });
}
  accept(senderId: number): void {
    this.requestService.acceptRequest({ sender_Id: senderId }).subscribe({
      next: () => {
        this.snackBar.open('Friend request accepted.', 'Close', { duration: 3000 });
        this.loadRequests();
      },
      error: () => {
        this.snackBar.open('Failed to accept request.', 'Close', { duration: 3000 });
      },
    });
  }

  reject(senderId: number): void {
    this.requestService.rejectRequest({ sender_Id: senderId }).subscribe({
      next: () => {
        this.snackBar.open('Friend request rejected.', 'Close', { duration: 3000 });
        this.loadRequests();
      },
      error: () => {
        this.snackBar.open('Failed to reject request.', 'Close', { duration: 3000 });
      },
    });
  }
  sendfriendrequest(){ 
     
  }
}
