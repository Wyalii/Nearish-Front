import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private chatConnection!: signalR.HubConnection;
  private notificationsConnection!: signalR.HubConnection;
  private http = inject(HttpClient);

  // --- CHAT CONNECTION ---
  startChatConnection(token: string) {
    this.chatConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://nearish-back.onrender.com/chathub', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.chatConnection
      .start()
      .then(() => console.log('Chat Hub connected'))
      .catch((err) => console.error('Chat Hub connection error:', err));

    this.chatConnection.onclose((error) => {
      console.warn('Chat connection closed', error);
    });
  }

  sendChatMessage(receiverId: string, message: string) {
    this.chatConnection
      .invoke('SendMessage', receiverId, message)
      .catch((err) => console.error('SendMessage error:', err));
  }

  onChatMessageReceived(handler: (senderId: string, message: string) => void) {
    this.chatConnection.on('ReceiveMessage', handler);
  }

  onMessageSent(handler: (message: string) => void) {
    this.chatConnection.on('MessageSent', handler);
  }

  onMessageFailed(handler: (error: string) => void) {
    this.chatConnection.on('MessageFailed', handler);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  getMessages(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = {
      userId: userId,
    };
    return this.http.post<Observable<any>>(
      'http://localhost:5150/api/Message/getMessages',
      body,
      {
        headers,
      }
    );
  }

  stopChatConnection() {
    if (this.chatConnection) {
      this.chatConnection.stop();
    }
  }

  // --- NOTIFICATIONS CONNECTION ---
  startNotificationsConnection(token: string) {
    this.notificationsConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://nearish-back.onrender.com/notificationshub', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.notificationsConnection
      .start()
      .then(() => {
        console.log('Notifications Hub connected');
        this.notificationsConnection.on(
          'ReceiveNotification',
          (notification) => {
            console.log('Notification received:', notification);
          }
        );
      })
      .catch((err) =>
        console.error('Notifications Hub connection error:', err)
      );

    this.notificationsConnection.onclose((error) => {
      console.warn('Notifications connection closed', error);
    });
  }

  onNotificationReceived(handler: (notification: any) => void) {
    this.notificationsConnection.on('ReceiveNotification', handler);
  }

  stopNotificationsConnection() {
    if (this.notificationsConnection) {
      this.notificationsConnection.stop();
    }
  }
}
