import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/posts-service';
import { RemovePost } from '../../interfaces/remove-post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostLikeService } from '../../Services/post-like-service';
import { TokenService } from '../../Services/token-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-card-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-card-component.html',
  styleUrl: './post-card-component.css',
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
  private tokenService = inject(TokenService);
  private postService = inject(PostService);
  private postLikeService = inject(PostLikeService);
  private router = inject(Router);
  isLoggedIn = false;
  isLiking = false;
  LikedPosts: Post[] = [];

  constructor() {}
  ngOnInit(): void {
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    if (this.isLoggedIn) {
      this.postService.getLikedPosts().subscribe({
        next: (res) => {
          this.LikedPosts = res;
          console.log('liked posts:');
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getLikeCount(): number {
    return this.post.likes?.length || 0;
  }

  getCommentCount(): number {
    return this.post.comments?.length || 0;
  }

  onEdit() {
    this.edit.emit(this.post);
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
        this.LikedPosts.push(this.post);
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
        this.LikedPosts = this.LikedPosts.filter((p) => p.id !== this.post.id);
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
    return this.LikedPosts.some((p) => p.id === this.post.id);
  }
}
