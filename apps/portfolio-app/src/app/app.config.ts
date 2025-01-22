import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import MyPreset from './themes/mypreset';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { portfolioFeatureKey, portfolioReducer } from './store/portfolio-store/portfolio.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25, autoPause: true
    }),
    provideStore({[portfolioFeatureKey]: portfolioReducer}),
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
