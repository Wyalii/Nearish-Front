import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostService } from '../../Services/posts-service';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../post-card-component/post-card-component';
import { CreatePost } from '../../interfaces/create-post';
import { CreatePostComponent } from '../pages/create-post-component/create-post-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-component',
  imports: [CommonModule, PostCardComponent, FormsModule],
  templateUrl: './post-component.html',
  styleUrl: './post-component.css',
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string = '';
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        this.loading = false;
      },
    });
  }

  goToPostCreate() {
    this.router.navigate(['/create-post']);
  }

  onPostCreated() {
    this.loadPosts();
  }

  getLikeCount(post: Post): number {
    return post.likes?.length || 0;
  }

  getCommentCount(post: Post): number {
    return post.comments?.length || 0;
  }

  deletePost(postId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    this.postService.deletePost({ postId }).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id !== postId);
      },
      error: (err) => {
        console.error('Failed to delete the post:', err);
        alert('Failed to delete the post.');
      },
    });
  }

  editPost(post: Post): void {
    const newDescription = prompt('Edit description:', post.description);
    if (newDescription === null) return;

    const newImageUrl = prompt('Edit image URL:', post.imageUrl || '');
    if (newImageUrl === null) return;

    const newVideoUrl = prompt('Edit video URL:', post.videoUrl || '');
    if (newVideoUrl === null) return;

    const dto = {
      postId: post.id,
      description: newDescription,
      imageUrl: newImageUrl,
      videoUrl: newVideoUrl,
    };

    this.postService.updatePost(dto).subscribe({
      next: (res) => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1 && res.data) {
          this.posts[index] = { ...this.posts[index], ...res.data };
        }
      },
      error: (err) => {
        console.error('Failed to update the post:', err);
        alert('Failed to update the post.');
      },
    });
  }
}
