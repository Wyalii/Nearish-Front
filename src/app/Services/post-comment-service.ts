import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePostComment } from '../interfaces/create-post-comment';
import { Observable } from 'rxjs';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { UpdatePostComment } from '../interfaces/update-post-comment';

@Injectable({
  providedIn: 'root',
})
export class PostCommentService {
  private readonly baseUrl =
    'http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/PostComment/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createPostComment(dto: CreatePostComment): Observable<BaseResponceInterface> {
    const headers = this.getAuthHeaders();
    return this.http.post<BaseResponceInterface>(
      `${this.baseUrl}create post comments`,
      dto,
      { headers }
    );
  }

  getComments(postId: number): Observable<BaseResponceInterface> {
    return this.http.get<BaseResponceInterface>(
      `http://ebs-nearish-api-development.eba-jdfmahu2.eu-north-1.elasticbeanstalk.com/api/Post/GetPost`
    );
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete post comments`, {
      body: { postCommentId: commentId },
    });
  }

  updatePostcomment(dto: UpdatePostComment): Observable<BaseResponceInterface> {
    return this.http.put<BaseResponceInterface>(
      `${this.baseUrl}update post comments`,
      dto,
      { headers: this.getAuthHeaders() }
    );
  }
}
