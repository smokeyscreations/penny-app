// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../users/user.model';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  

  on(UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(UserActions.logout, (state) => ({
    ...state,
    user: null,
  })),

  on(UserActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
  })),
  
  on(UserActions.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  
  on(UserActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(UserActions.changePassword, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.changePasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(UserActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.resetPassword, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.resetPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
  })),
  on(UserActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
