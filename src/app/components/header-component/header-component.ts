import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/token-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-component',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isProfilePictureSet = false;
  public profilePicture: string = '';
  tokenService = inject(TokenService);
  ngOnInit(): void {
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.tokenService.removeTokenFromLocalStorage();
  }
}
