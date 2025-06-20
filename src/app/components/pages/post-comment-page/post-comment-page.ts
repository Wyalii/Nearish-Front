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

  private commentService = inject(PostCommentService);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('postId'));
    if (postId) {
      this.loadPost(postId);
      this.fetchComments();
    } else {
      console.error('No postId found in route params');
    }
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
        console.error('Failed to fetch comments:', err);
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
      },
      error: (err) => {
        console.error('Failed to load post:', err);
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
      },
      error: (err) => {
        console.error('Failed to create comment:', err);
      },
    });
  }
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments = this.comments.filter((c) => c.id !== commentId);
        }
      },
      error: (err) => {
        console.error('Failed to delete comment:', err);
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
      },
      error: (err) => {
        console.error('Failed to update comment:', err);
      },
    });
  }
}
