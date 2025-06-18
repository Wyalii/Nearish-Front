import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './Services/api-service';
import { register } from './interfaces/register';
import { UserRegisterComponent } from "./components/user-register-component/user-register-component";
import { HeaderComponent } from "./components/header-component/header-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  service = inject(ApiService)
  protected title = 'Nearish-Front';

   ragaca!:register

  registerFunc(){
this.service.register(this.ragaca).subscribe({
  next:(data)=>{
    console.log('mushaobs')
  },
  error(err){
    console.log('failed',err)
  }
})
  }
}
