import { Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register-component/user-register-component';
import { LoginComponent } from './components/login-component/login-component';
import { PostComponent } from './components/post-component/post-component';
import { VerifyPage } from './components/pages/verify-page/verify-page';

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
    },
    {
        path:'verify',
        component:VerifyPage
    }
];
