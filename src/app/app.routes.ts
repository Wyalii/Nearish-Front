import { Routes } from '@angular/router';
import { PostComponent } from './components/post-component/post-component';
import { VerifyPage } from './components/pages/verify-page/verify-page';
import { UserRegisterComponent } from './components/pages/user-register-component/user-register-component';
import { LoginComponent } from './components/pages/login-component/login-component';

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
