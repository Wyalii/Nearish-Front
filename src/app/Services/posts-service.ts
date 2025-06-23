import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponceInterface } from '../interfaces/base-responce-interface';
import { Observable } from 'rxjs';
import { CreatePost } from '../interfaces/create-post';
import { Post } from '../interfaces/post';
import { UpdatePost } from '../interfaces/update-post';
import { RemovePost } from '../interfaces/remove-post';
import { GetPostRequest } from '../interfaces/get-post-request';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'https://nearish-back.onrender.com/api/Post/';
  public createdPosts: Post[] = [];
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createPost(dto: CreatePost): Observable<BaseResponceInterface> {
    const headers = this.getAuthHeaders();
    return this.http.post<BaseResponceInterface>(
      `${this.baseUrl}create post`,
      dto,
      { headers }
    );
  }

  getPostById(dto: GetPostRequest): Observable<{ post: Post }> {
    return this.http.post<{ post: Post }>(`${this.baseUrl}GetPost`, dto);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}get all posts`);
  }

  getLikedPosts(): Observable<Post[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Post[]>(`${this.baseUrl}GetLikedPosts`, { headers });
  }

  updatePost(dto: UpdatePost): Observable<BaseResponceInterface> {
    return this.http.patch<BaseResponceInterface>(
      `${this.baseUrl}update post`,
      dto,
      { headers: this.getAuthHeaders() }
    );
  }

  deletePost(dto: RemovePost): Observable<BaseResponceInterface> {
    const headers = this.getAuthHeaders();
    return this.http.request<BaseResponceInterface>(
      'DELETE',
      `${this.baseUrl}delete post`,
      {
        headers,
        body: dto,
      }
    );
  }
  getCreatedPostsByUser() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}GetCreatedPostsByUser`, { headers });
  }
  loadCreatedPosts(): void {
    this.getCreatedPostsByUser().subscribe({
      next: (res: any) => {
        this.createdPosts = res || [];
        console.log(this.createdPosts);
      },
      error: (err) => {
        console.error('Failed to load created posts:', err);
      },
    });
  }
}
