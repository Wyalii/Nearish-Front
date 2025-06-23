import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  private http = inject(HttpClient);
  private baseUrl: string = 'https://nearish-back.onrender.com/api/Search/';
  searchUsers(searchQuery: string) {
    return this.http.get<{ success: boolean; message: string; data: any[] }>(
      `${this.baseUrl}users?searchQuery=${encodeURIComponent(
        searchQuery.trim()
      )}`
    );
  }

  searchPosts(searchQuery: string) {
    return this.http.get<{ success: boolean; message: string; data: any[] }>(
      `${this.baseUrl}posts?searchQuery=${encodeURIComponent(
        searchQuery.trim()
      )}`
    );
  }
}
