import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/hero/home.component';
import { PortfoliosComponent } from './portfolios/portfolios/portfolios.component';
import { SignupComponent } from './signup/signup/signup.component';

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
        path: 'portfolios',
        component: PortfoliosComponent
    },
];
