import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { Observable } from 'rxjs';
import { CreatePostLikeInterface } from '../interfaces/create-post-like-interface';
import { RemovePostLikeInterface } from '../interfaces/remove-post-like-interface';

@Injectable({
  providedIn: 'root',
})
export class PostLikeService {
  private baseUrl =
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/PostLike';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  likePost(postId: number): Observable<BaseResponceInterface> {
    const body: CreatePostLikeInterface = { postId };
    return this.http.post<BaseResponceInterface>(
      `${this.baseUrl}/like post`,
      body,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  unlikePost(postId: number): Observable<BaseResponceInterface> {
    const body: RemovePostLikeInterface = { postId };
    return this.http.request<BaseResponceInterface>(
      'DELETE',
      `${this.baseUrl}/unlike post`,
      {
        body,
        headers: this.getAuthHeaders(),
      }
    );
  }
}
