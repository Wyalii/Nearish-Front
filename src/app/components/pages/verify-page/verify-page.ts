import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserVerify } from '../../../interfaces/user-verify';
import { AuthService } from '../../../Services/AuthService';

@Component({
  selector: 'app-verify-page',
  imports: [],
  templateUrl: './verify-page.html',
  styleUrl: './verify-page.css'
})
export class VerifyPage implements OnInit{
  private route = inject(ActivatedRoute)
  apiService = inject(AuthService)
  message = 'Verifying...';
  loading = true;
  UserVerify:UserVerify = 
  {
    token: ''
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'No verification token found in the URL.';
      this.loading = false;
      return;
    }
    this.UserVerify.token = token
    this.apiService.verify(this.UserVerify).subscribe({
      next: (res) =>
      {
        this.message = "verified :)"
        console.log(res)
        alert("verified success!")
      },
      error: (err) =>
      {
        console.log(err)
        alert('verifiy failed!')
      }
    })

  }
}
