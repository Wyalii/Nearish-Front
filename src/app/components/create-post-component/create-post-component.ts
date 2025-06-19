import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CreatePost } from '../../interfaces/create-post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../Services/posts-service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post-component.html',
  styleUrls: ['./create-post-component.css'] 
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<CreatePost>();
  @Output() cancelled = new EventEmitter<void>();
  postService = inject(PostService)
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: [''],
      videoUrl: [''],
    });
  }

  submit() {
      if (this.postForm.invalid) {
        this.postForm.markAllAsTouched(); 
        return;
      }
    
      const postData: CreatePost = { ...this.postForm.value };
    
      this.postService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post created:', response);
          this.postForm.reset();
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
  }

  cancel() {
    this.cancelled.emit();
  }
}