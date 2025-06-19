import { Routes } from '@angular/router';
import { VerifyPage } from './components/pages/verify-page/verify-page';
import { HomePage } from './components/pages/home-page/home-page';
import { LoginPage } from './components/pages/login-page/login-component';
import { RegisterPage } from './components/pages/register-page/user-register-component';


export const routes: Routes = [

    {
        path:'',
        component:HomePage
    },
    {
        path:'register',
        component:RegisterPage
    },{
        path:'login',
        component:LoginPage
    },
    {
        path:'verify',
        component:VerifyPage
    }
];
