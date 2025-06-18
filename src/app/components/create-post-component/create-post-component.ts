import { Component, EventEmitter, Output } from '@angular/core';
import { CreatePost } from '../../interfaces/create-post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    this.postCreated.emit(this.postForm.value);
    this.postForm.reset();
  }

  cancel() {
    this.cancelled.emit();
  }
}