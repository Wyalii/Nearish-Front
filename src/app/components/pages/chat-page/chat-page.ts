import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalrService } from '../../../Services/signalr-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user-service';

@Component({
  selector: 'app-chat-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css',
})
export class ChatPage implements OnInit {
  userService = inject(UserService);
  messages: any[] = [];
  newMessage = '';
  receiverId: string | null = null;
  SenderUser: any;

  constructor(
    private signalrService: SignalrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.receiverId = this.route.snapshot.paramMap.get('id');
    if (this.receiverId) {
      const receiverIdInt = Number(this.receiverId);
      this.loadReceiverUser(this.receiverId);
      this.signalrService.getMessages(receiverIdInt).subscribe({
        next: (res) => {
          console.log('messages:');
          console.log(res);
          this.messages = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.signalrService.onChatMessageReceived((senderId, message) => {
      this.messages.push({ senderId, message });
      const receiverIdInt = Number(this.receiverId);
      this.signalrService.getMessages(receiverIdInt).subscribe({
        next: (res) => {
          console.log('messages:');
          console.log(res);
          this.messages = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log(this.messages);
    });

    this.signalrService.onMessageSent((message) => {
      console.log('Message sent:', message);
      console.log(this.messages);
    });

    this.signalrService.onMessageFailed((error) => {
      console.error('Message failed:', error);
    });
  }

  loadReceiverUser(userId: string) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.SenderUser = res.data;
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.receiverId) return;

    this.signalrService.sendChatMessage(
      this.receiverId,
      this.newMessage.trim()
    );
    const receiverIdInt = Number(this.receiverId);
    this.signalrService.getMessages(receiverIdInt).subscribe({
      next: (res) => {
        console.log('messages:');
        console.log(res);
        this.messages = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.messages.push({ senderId: 'me', text: this.newMessage.trim() });
    this.newMessage = '';
  }
}
