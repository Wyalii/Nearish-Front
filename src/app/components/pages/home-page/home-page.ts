import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from '../../post-component/post-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user-service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-home-page',
  imports: [PostComponent, CommonModule, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  userService = inject(UserService);
  user: User | null = null;
  ngOnInit(): void {
    this.userService.loadUser();
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  checkUser() {
    console.log(this.user?.name);
  }
}
