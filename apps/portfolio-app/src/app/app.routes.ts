import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/hero/home.component';
import { PortfoliosComponent } from './portfolios/portfolios/portfolios.component';

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
        path: 'portfolios',
        component: PortfoliosComponent
    }
];
