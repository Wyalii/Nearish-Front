import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header-component/header-component';
import { SignalrService } from './Services/signalr-service';
import { TokenService } from './Services/token-service';
import { UserService } from './Services/user-service';

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
  private userService = inject(UserService);

  isLoggedIn = false;

  private connectionsStarted = false;

  ngOnInit(): void {
    this.userService.loadUser();

    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (status && !this.connectionsStarted) {
        const token = this.tokenService.getTokenFromLocalStorage();
        if (token) {
          this.signalRSerivce.startChatConnection(token);
          this.signalRSerivce.startNotificationsConnection(token);
          this.connectionsStarted = true;
        }
      }

      if (!status && this.connectionsStarted) {
        this.signalRSerivce.stopChatConnection();
        this.signalRSerivce.stopNotificationsConnection();
        this.connectionsStarted = false;
      }
    });
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
