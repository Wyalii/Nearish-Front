
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePostComment } from '../interfaces/create-post-comment';
import { Observable } from 'rxjs';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { PostComment } from '../interfaces/post-comment';
import { UpdatePostComment } from '../interfaces/update-post-comment';
import { DeletePostCommnet } from '../interfaces/delete-post-commnet';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {
  private readonly baseUrl = 'https://nearish-back.onrender.com/api/PostComment/';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
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

  getComments(postId: number): Observable<PostComment[]> {
  return this.http.get<PostComment[]>(`${this.baseUrl}get all post comments`);
}

deletePostcomment(postId: number): Observable<BaseResponceInterface> {
  const headers = this.getAuthHeaders();
  return this.http.request<BaseResponceInterface>(
    'DELETE',
    `${this.baseUrl}delete post comments`,
    {
      headers,
      body: { postId: postId }
    }
  );
}
   
    updatePostcomment(dto: UpdatePostComment): Observable<BaseResponceInterface> {
      return this.http.put<BaseResponceInterface>(
        `${this.baseUrl}update post comments`,
        dto,
        { headers: this.getAuthHeaders() }
      );
    }
  
}
