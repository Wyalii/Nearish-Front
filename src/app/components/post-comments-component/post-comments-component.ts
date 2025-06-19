import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostComment } from '../../interfaces/post-comment';
import { PostCommentService } from '../../Services/post-comment-service';
import { CreatePostComment } from '../../interfaces/create-post-comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseResponceInterface } from '../../interfaces/base-responce-interface';
import { DeletePostCommnet } from '../../interfaces/delete-post-commnet';

@Component({
  selector: 'app-post-comments-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './post-comments-component.html',
  styleUrl: './post-comments-component.css'
})
export class PostCommentsComponent implements OnInit {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<void>();

  comments: PostComment[] = [];
  newCommentText = '';

  // Added edit tracking
  editCommentId: number | null = null;
  editCommentText: string = '';

  constructor(private postCommentService: PostCommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.postCommentService.getComments(this.postId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
      }
    });
  }

  addComment() {
    if (!this.newCommentText.trim()) return;

    const dto: CreatePostComment = {
      postId: this.postId,
      text: this.newCommentText.trim()
    };

    this.postCommentService.createPostComment(dto).subscribe({
      next: (res: BaseResponceInterface) => {
        if (res.success && res.data) {
          this.comments.unshift(res.data);
          this.newCommentText = '';
          this.commentAdded.emit();
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error('Failed to add comment', err);
        alert('Error adding comment');
      }
    });
  }

 
  startEdit(comment: PostComment) {
    this.editCommentId = comment.id;
    this.editCommentText = comment.text;
  }

 
  cancelEdit() {
    this.editCommentId = null;
    this.editCommentText = '';
  }

  
  updateComment(commentId: number) {
    if (!this.editCommentText.trim()) return;

    this.postCommentService.updatePostcomment({
      commentId,
      text: this.editCommentText.trim()
    }).subscribe({
      next: (res) => {
        if (res.success) {
          const index = this.comments.findIndex(c => c.id === commentId);
          if (index !== -1) {
            this.comments[index].text = this.editCommentText.trim();
          }
          this.cancelEdit();
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error('Failed to update comment', err);
        alert('Error updating comment');
      }
    });
  }


deleteComment(comment: PostComment) {
  this.postCommentService.deletePostcomment(comment).subscribe({
    next: (res) => {
      if (res.success) {
        this.comments = this.comments.filter(c => c.id !== comment.id);
      } else {
        alert(res.message);
      }
    },
    error: (err) => {
      console.error('Failed to delete comment', err);
      alert('Error deleting comment');
    }
  });
}

}