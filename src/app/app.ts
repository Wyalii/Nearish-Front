import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header-component/header-component';
import { SignalrService } from './Services/signalr-service';
import { TokenService } from './Services/token-service';
import { PostService } from './Services/posts-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'Nearish-Front';
  private signalRSerivce = inject(SignalrService);
  private tokenService = inject(TokenService);
  isLoggedIn = false;

  ngOnInit(): void {
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    if (this.isLoggedIn === true) {
      const token = this.tokenService.getTokenFromLocalStorage();
      if (token != undefined) {
        this.signalRSerivce.startChatConnection(token);
        this.signalRSerivce.startNotificationsConnection(token);
      }
    }
  }

  // memgoni agar aris es sawiro xo??

  // service = inject(ApiService)
  //  ragaca!:register
  //   registerFunc(){
  //   this.service.register(this.ragaca).subscribe({
  //   next:(data)=>{
  //     console.log('mushaobs')
  //   },
  //   error(err){
  //     console.log('failed',err)
  //   }
  // })
  //   }
}
