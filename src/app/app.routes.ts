import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { UserRegisterComponent } from './components/user-register-component/user-register-component';
import { LoginComponent } from './components/login-component/login-component';

export const routes: Routes = [

    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'register',
        component:UserRegisterComponent
    },{
        path:'login',
        component:LoginComponent
    }
];
