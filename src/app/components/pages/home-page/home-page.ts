import { Component } from '@angular/core';
import { PostComponent } from '../../post-component/post-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [PostComponent,CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
