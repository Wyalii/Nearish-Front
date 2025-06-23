import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CreatePost } from '../../../interfaces/create-post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../Services/posts-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../../../Services/file-service';

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
  uploading: boolean = false;
  private router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: [''],
      videoUrl: [''],
    });
  }
  async handleFileUpload(event: Event, type: 'image') {
    this.uploading = true;
    const fileUrl = await this.fileService.uploadFile(event, type);
    if (fileUrl) {
      if (type === 'image') {
        this.postForm.patchValue({ imageUrl: fileUrl });
        this.uploading = false;
      } else {
        this.snackBar.open(
          'image upload failed. please try again',
          'Dismiss',
          {
            duration: 4000,
          }
        );
        this.uploading = false;
      }
    }
  }

  async handleVideoUpload(event: Event) {
    this.uploading = true;
    const videoUrl = await this.fileService.uploadFile(event, 'video');
    if (videoUrl) {
      this.postForm.patchValue({ videoUrl });
      this.uploading = false;
    } else {
      this.snackBar.open('Video upload failed. Please try again.', 'Dismiss', {
        duration: 4000,
      });
      this.uploading = false;
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
        this.cancel();
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

        this.cancel();
      },
    });
  }

  cancel() {
    this.cancelled.emit();
    this.router.navigate(['/']);
  }
}
