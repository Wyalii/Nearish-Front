import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CreatePost } from '../../interfaces/create-post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../Services/posts-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../../Services/file-service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post-component.html',
  styleUrls: ['./create-post-component.css'],
})
export class CreatePostComponent {
  @Output() cancelled = new EventEmitter<void>();
  postService = inject(PostService);
  private snackBar = inject(MatSnackBar);
  fileService = inject(FileService);
  postForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: [''],
      videoUrl: [''],
    });
  }
  async handleFileUpload(event: Event, type: 'image') {
    const fileUrl = await this.fileService.uploadFile(event, type);
    if (fileUrl) {
      if (type === 'image') {
        this.postForm.patchValue({ imageUrl: fileUrl });
      } else {
        this.snackBar.open(
          'Video upload failed. Please try again.',
          'Dismiss',
          {
            duration: 4000,
          }
        );
      }
    }
  }

  async handleVideoUpload(event: Event) {
    const videoUrl = await this.fileService.uploadFile(event, 'video');
    if (videoUrl) {
      this.postForm.patchValue({ videoUrl });
    } else {
      this.snackBar.open('Video upload failed. Please try again.', 'Dismiss', {
        duration: 4000,
      });
    }
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
        this.snackBar.open('Succesfully created a post!', 'Dismiss', {
          duration: 5000,
        });
        this.postForm.reset();
        this.cancelled.emit();
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.snackBar.open(
          'Failed to create post. Please try again.',
          'Dismiss',
          {
            duration: 5000,
          }
        );
        this.cancelled.emit();
      },
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
