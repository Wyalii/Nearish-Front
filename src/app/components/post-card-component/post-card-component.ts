import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/posts-service';
import { RemovePost } from '../../interfaces/remove-post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostLikeService } from '../../Services/post-like-service';

@Component({
  selector: 'app-post-card-component',
  imports: [CommonModule],
  templateUrl: './post-card-component.html',
  styleUrl: './post-card-component.css',
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();

  private postService = inject(PostService);
  private postLikeService = inject(PostLikeService);
  private router = inject(Router);

  isLiking = false;

  constructor() {}

  getLikeCount(): number {
    return this.post.likes?.length || 0;
  }

  getCommentCount(): number {
    return this.post.comments?.length || 0;
  }

  onEdit() {
    this.edit.emit(this.post);
  }

  onDelete() {
    const removePostBody: RemovePost = { postId: this.post.id };
    this.postService.deletePost(removePostBody).subscribe({
      next: () => this.delete.emit(this.post.id),
      error: (err) => console.error('Delete failed:', err),
    });
  }

  viewComments() {
    this.router.navigate(['/post', this.post.id]);
  }

  likePost() {
    if (this.isLiking) return;
    this.isLiking = true;

    this.postLikeService.likePost(this.post.id).subscribe({
      next: () => {
        this.post.likes = [...(this.post.likes || []), {} as any];
      },
      error: (err) => console.error('Failed to like post', err),
      complete: () => (this.isLiking = false),
    });
  }

  unlikePost() {
    if (this.isLiking) return;
    this.isLiking = true;

    this.postLikeService.unlikePost(this.post.id).subscribe({
      next: () => {
        this.post.likes = (this.post.likes || []).slice(0, -1);
      },
      error: (err) => console.error('Failed to unlike post', err),
      complete: () => (this.isLiking = false),
    });
  }

  toggleLike() {
    if ((this.post.likes?.length || 0) > 0) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  isPostLiked(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token || !this.post.likes) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      return this.post.likes.some((like) => like.userId === userId);
    } catch {
      return false;
    }
  }
}
