import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/hero/home.component';
import { PortfoliosComponent } from './portfolios/portfolios/portfolios.component';
import { SignupComponent } from './signup/signup/signup.component';
import { authGuard } from './login/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { MyPortfoliosComponent } from './my-portfolios/my-portfolios/my-portfolios.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'create-portfolios',
        component: PortfoliosComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'my-portfolios',
        component: MyPortfoliosComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard],
    }
];
