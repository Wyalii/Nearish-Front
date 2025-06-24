import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendFriendRequest } from '../interfaces/send-friend-request';
import { Observable } from 'rxjs';
import { AcceptFriendRequest } from '../interfaces/accept-friend-request';
import { RejectFriendRequest } from '../interfaces/reject-friend-request';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  private apiUrl = 'https://nearish-back.onrender.com/api/FriendRequest';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getTokenFromLocalStorage();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  sendRequest(dto: SendFriendRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/send`, dto, { headers });
  }

  getReceivedRequests() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/get`, { headers });
  }

  acceptRequest(dto: AcceptFriendRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/accept`, dto, { headers });
  }

  rejectRequest(dto: RejectFriendRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/reject`, dto, { headers });
  }
  getFriends() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/FriendRequest/GetFriends`, {
      headers,
    });
  }

  isFriend(userId: number) {
    const headers = this.getAuthHeaders();
    const body = { userId: userId };
    return this.http.post<boolean>(
      `${this.apiUrl}/FriendRequest/isFriend`,
      body,
      { headers }
    );
  }
}
