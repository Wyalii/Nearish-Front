import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/posts-service';
import { RemovePost } from '../../interfaces/remove-post';

@Component({
  selector: 'app-post-card-component',
  imports: [CommonModule],
  templateUrl: './post-card-component.html',
  styleUrl: './post-card-component.css'
})
export class PostCardComponent {
@Input() post!: Post;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
  postService = inject(PostService)

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
    const removePostBody:RemovePost =
    {
      postId: this.post.id
    } 
     this.postService.deletePost(removePostBody).subscribe({
    next: (res) => {
      console.log('Deleted successfully:', res);
    },
    error: (err) => {
      console.error('Delete failed:', err);
    }
  });
  }
}
