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
      this.loadReceiverUser(this.receiverId);
    }
    this.signalrService.onChatMessageReceived((senderId, message) => {
      this.messages.push({ senderId, message });
    });

    this.signalrService.onMessageSent((message) => {
      console.log('Message sent:', message);
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

    this.messages.push({ senderId: 'me', message: this.newMessage.trim() });
    this.newMessage = '';
  }
}
