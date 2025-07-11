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
import { selfProfileGuard } from './auth/self-profile-guard';
import { guestGuard } from './auth/guest-guard';
import { FriendsListPage } from './components/pages/friends-list-page/friends-list-page';
import { ChatPage } from './components/pages/chat-page/chat-page';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [guestGuard],
  },
  {
    path: 'verify',
    component: VerifyPage,
    canActivate: [guestGuard],
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
    path: 'user/:id',
    component: OthersPage,
    canActivate: [selfProfileGuard],
  },
  {
    path: 'Friends',
    component: FriendsListPage,
  },
  { path: 'chat/:id', component: ChatPage, canActivate: [authGuard] },

  {
    path: '**',
    component: HomePage,
  },
];
