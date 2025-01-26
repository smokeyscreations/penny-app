import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../users/user.model';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ email, password }) =>
        this.http.post<{ message: string }>('http://localhost:3000/api/auth/login',
          { email, password },
          { withCredentials: true } 
        ).pipe(
          switchMap(() => [
            UserActions.loadUser() 
          ]),
          catchError(error =>
            of(UserActions.loginFailure({ error }))
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.http.get<User>('http://localhost:3000/api/auth/user', {
          withCredentials: true,
        }).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signup),
      switchMap(({ name, email, password }) =>
        this.http.post<User>('http://localhost:3000/api/auth/signup',
          { name, email, password },
          { withCredentials: true } 
        ).pipe(
          map((user) => UserActions.signupSuccess({ user })),
          catchError((error) => of(UserActions.signupFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.http.post<{ message: string }>(
          'http://localhost:3000/api/auth/logout',
          {},
          { withCredentials: true }
        ).pipe(
          map(() => UserActions.logoutSuccess()),
          catchError((error) => of(UserActions.logoutFailure({error})))
        )
      )
    )
  );
  
  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.changePassword),
      switchMap(({ oldPassword, newPassword }) =>
        this.http.put<{ message: string }>(
          'http://localhost:3000/api/auth/change-password',
          { oldPassword, newPassword },
          { withCredentials: true } 
        ).pipe(
          map(response => UserActions.changePasswordSuccess({ message: response.message })),
          catchError(error => of(UserActions.changePasswordFailure({ error })))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.forgotPassword),
      switchMap(({ email }) =>
        this.http.post<{ message: string }>(
          'http://localhost:3000/api/auth/forgot-password',
          { email },
          { withCredentials: true }
        ).pipe(
          map(({ message }) => 
            UserActions.forgotPasswordSuccess({ message })
          ),
          catchError(error =>
            of(UserActions.forgotPasswordFailure({ error }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.resetPassword),
      switchMap(({ newPassword, token }) =>
        this.http.put<{ message: string }>(
          'http://localhost:3000/api/auth/reset-password',
          { 
            newPassword,
            resetToken: token   
          },
          { withCredentials: true }
        ).pipe(
          map(({ message }) => 
            UserActions.resetPasswordSuccess({ message })
          ),
          catchError(error =>
            of(UserActions.resetPasswordFailure({ error }))
          )
        )
      )
    )
  );

}
