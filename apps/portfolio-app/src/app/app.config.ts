import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import MyPreset from './themes/mypreset';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { portfolioReducer } from './store/portfolio-store/portfolio.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userFeatureKey, userReducer } from './store/user-store/user.reducer';
import { UserEffects } from './store/user-store/user.effects';
import { PortfolioEffects } from './store/portfolio-store/portfolios.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(UserEffects, PortfolioEffects),
    provideStoreDevtools({
      maxAge: 25, autoPause: true
    }),
    provideStore({'portfolio': portfolioReducer,
      [userFeatureKey]: userReducer,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
