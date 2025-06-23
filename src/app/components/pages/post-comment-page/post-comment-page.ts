import { Component, inject, Input, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { PostCommentService } from '../../../Services/post-comment-service';
import { CreatePostComment } from '../../../interfaces/create-post-comment';
import { UpdatePostComment } from '../../../interfaces/update-post-comment';
import { PostService } from '../../../Services/posts-service';
import { GetPostRequest } from '../../../interfaces/get-post-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComment } from '../../../interfaces/post-comment';
import { TokenService } from '../../../Services/token-service';
import { RemovePost } from '../../../interfaces/remove-post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-comment-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-comment-page.html',
  styleUrls: ['./post-comment-page.css'],
})
export class PostCommentPage implements OnInit {
  post!: Post;
  comments: any[] = [];
  newComment = '';
  editingCommentId: number | null = null;
  editedCommentText: string = '';
  showDeleteModal = false;
  showDropdown = false;

  private commentService = inject(PostCommentService);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tokenService = inject(TokenService);
    private snackBar = inject(MatSnackBar);
  ngOnInit() {
    const token = this.tokenService.getTokenFromLocalStorage();
    const postId = Number(this.route.snapshot.paramMap.get('postId'));
    if (!postId) {
      console.error('No postId found in route params');
      return;
    }

    if (token) {
      this.postService.getCreatedPostsByUser().subscribe({
        next: (res: any) => {
          this.postService.createdPosts = res || [];
          console.log('Created posts loaded:', this.postService.createdPosts);
          this.loadPost(postId);
        },
        error: (err) => {
          this.snackBar.open(`${err.error.details}`, 'Dismiss', {
          duration: 5000,
        });
          this.loadPost(postId);
        },
      });
    } else {
      this.loadPost(postId);
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  copyPostUrl() {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl);
    this.snackBar.open('Post URL copied to clipboard', 'Dismiss', {
          duration: 5000,
        });
  }

  deletePost() {
    const removePostDto: RemovePost = { postId: this.post.id };
    this.showDeleteModal = false;
    this.postService.deletePost(removePostDto).subscribe({
      next: (res) => {
        console.log(res);
        this.goBack();
         this.snackBar.open(`Succesfully deleted post`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
       this.snackBar.open(`${err.error.details}`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
  isAdminOfPost(): boolean {
    return this.postService.createdPosts.some((p) => p.id === this.post.id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
  fetchComments() {
    this.commentService.getComments(this.post.id).subscribe({
      next: (res) => {
        console.log(this.comments);
        if (res.success) this.comments = res.data;
      },
      error: (err) => {
       this.snackBar.open(`${err.error.details}`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
  loadPost(postId: number) {
    const dto: GetPostRequest = { postId };

    this.postService.getPostById(dto).subscribe({
      next: (res) => {
        this.post = res.post;
        this.comments = this.post.comments || [];
        console.log(this.comments);
        console.log(this.post);
        this.fetchComments();
      },
      error: (err) => {
       this.snackBar.open(`${err.error.details}`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
  addComment() {
    const dto: CreatePostComment = {
      postId: this.post.id,
      text: this.newComment,
    };

    this.commentService.createPostComment(dto).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments.push(res.data);
          this.newComment = '';
        }
         this.snackBar.open(`Succesfully commented`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
       this.snackBar.open(`failed to comment not loggined in`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments = this.comments.filter((c) => c.id !== commentId);
        }
         this.snackBar.open(`Succesfully deleted comment`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
        this.snackBar.open(`failed to delete comment`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
  startEdit(comment: PostComment) {
    this.editingCommentId = comment.id;
    this.editedCommentText = comment.text;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editedCommentText = '';
  }
  updateComment(commentID: number) {
    const dto: UpdatePostComment = {
      commentId: commentID,
      text: this.editedCommentText,
    };

    this.commentService.updatePostcomment(dto).subscribe({
      next: (res) => {
        if (res.success) {
          const comment = this.comments.find((c) => c.id === commentID);
          if (comment) comment.text = this.editedCommentText;

          this.editingCommentId = null;
          this.editedCommentText = '';
        }
        this.snackBar.open(`Succesfully updated post comment`, 'Dismiss', {
          duration: 5000,
        });
      },
      error: (err) => {
       this.snackBar.open(`failed to update comment`, 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
}
