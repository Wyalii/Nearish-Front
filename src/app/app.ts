import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './Services/api-service';
import { register } from './interfaces/register';
import { HeaderComponent } from "./components/header-component/header-component";
import { SignalrService } from './Services/signalr-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'Nearish-Front';
  signalRSerivce = inject(SignalrService)
   ngOnInit(): void {
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibGF3eGcxMjNAZ21haWwuY29tIiwiZXhwIjoxNzUwMjczNDUyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNTAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.I7J1ePLBK8oQVjslq3xDJcMUBi45drIhwyUsirzXjCaLfsDh7f5xZ7xqMq7V2ehK5Gut7fRRZQvesSapL_TIrw"
    this.signalRSerivce.startChatConnection(token);
    this.signalRSerivce.startNotificationsConnection(token);
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
