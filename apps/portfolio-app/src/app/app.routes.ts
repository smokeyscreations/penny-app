import { Route } from '@angular/router';
import { authGuard } from './login/auth.guard';
import { PortfoliosComponent } from './portfolios/portfolios/portfolios.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';
import { MyPortfoliosComponent } from './my-portfolios/my-portfolios/my-portfolios.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/hero/home.component';


export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'create-portfolios',
    canActivate: [authGuard],
    component: PortfoliosComponent,
  },
  {
    path: 'my-portfolios',
    canActivate: [authGuard],
    component: MyPortfoliosComponent,
  },
  
  {
    path: 'change-password',
    canActivate: [authGuard],
    component: ChangePasswordComponent,
  },
];
