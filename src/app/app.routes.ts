import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { UserRegisterComponent } from './components/user-register-component/user-register-component';
import { LoginComponent } from './components/login-component/login-component';
import { PostComponent } from './components/post-component/post-component';

export const routes: Routes = [

    {
        path:'',
        component:PostComponent
    },
    {
        path:'register',
        component:UserRegisterComponent
    },{
        path:'login',
        component:LoginComponent
    }
];
