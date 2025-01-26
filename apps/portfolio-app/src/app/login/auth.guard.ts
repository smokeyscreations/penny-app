import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectCurrentUser } from './../store/user-store/user.selector';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCurrentUser).pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
