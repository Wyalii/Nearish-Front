import { Routes } from '@angular/router';
import { VerifyPage } from './components/pages/verify-page/verify-page';
import { HomePage } from './components/pages/home-page/home-page';
import { LoginPage } from './components/pages/login-page/login-component';
import { RegisterPage } from './components/pages/register-page/user-register-component';
import { PostCommentPage } from './components/pages/post-comment-page/post-comment-page';
import { CreatePostComponent } from './components/pages/create-post-component/create-post-component';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { PasswordReset } from './components/pages/password-reset/password-reset';
import { ForgotPassword } from './components/pages/forgot-password/forgot-password';
import { FriendRequestPage } from './components/pages/friend-request-page/friend-request-page';
import { SearchPage } from './components/pages/search-page/search-page';
import { OthersPage } from './components/pages/others-page/others-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'verify',
    component: VerifyPage,
  },
  {
    path: 'post/:postId',
    component: PostCommentPage,
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'profile/:username',
    component: ProfilePage,
  },
  {
    path: 'passwordReset/:token',
    component: PasswordReset,
  },
  {
    path: 'forgotPassword',
    component: ForgotPassword,
  },
  {
    path: 'friendRequests',
    component: FriendRequestPage,
  },
  {
    path: 'searchPage',
    component: SearchPage,
  },
  {
    path: 'user/:id', // public view of another user's profile
    component: OthersPage,
  },
  {
    path: '**',
    component: HomePage,
  },
];
