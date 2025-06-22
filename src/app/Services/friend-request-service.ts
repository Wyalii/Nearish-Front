import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendFriendRequest } from '../interfaces/send-friend-request';
import { Observable } from 'rxjs';
import { FriendRequest } from '../interfaces/friend-request';
import { AcceptFriendRequest } from '../interfaces/accept-friend-request';
import { RejectFriendRequest } from '../interfaces/reject-friend-request';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
 
   private apiUrl = 'https://nearish-back.onrender.com/api/FriendRequest';

  constructor(private http: HttpClient) {}

  sendRequest(dto: SendFriendRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, dto);
  }

  getReceivedRequests() {
    return this.http.get(`${this.apiUrl}/get`);
  }

  acceptRequest(dto: AcceptFriendRequest): Observable<any> {
    return this.http.patch(`${this.apiUrl}/accept`, dto);
  }

  rejectRequest(dto: RejectFriendRequest): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reject`, dto);
  }
  
}
