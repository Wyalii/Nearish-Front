import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';

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
    this.delete.emit(this.post.id);
  }
}
