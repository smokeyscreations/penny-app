import { createAction, props } from '@ngrx/store';
import { User } from '../../users/user.model';

// Existing login actions
export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>()
);

// Existing loadUser actions...
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

// Logout
export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout Failure',
  props<{ error: any }>()
);

// ---------- SIGNUP ACTIONS ----------
export const signup = createAction(
  '[User] Signup',
  props<{ name: string; email: string; password: string }>()
);

export const signupSuccess = createAction(
  '[User] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[User] Signup Failure',
  props<{ error: any }>()
);

export const changePassword = createAction(
  '[User] Change Password',
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordSuccess = createAction(
  '[User] Change Password Success',
  props<{ message: string }>()
);

export const changePasswordFailure = createAction(
  '[User] Change Password Failure',
  props<{ error: any }>()
);

export const forgotPassword = createAction(
  '[User] Forgot Password',
  props<{ email: string }>()
);

export const forgotPasswordSuccess = createAction(
  '[User] Forgot Password Success',
  props<{ message: string }>()
);

export const forgotPasswordFailure = createAction(
  '[User] Forgot Password Failure',
  props<{ error: any }>()
);

export const resetPassword = createAction(
  '[User] Reset Password',
  props<{ newPassword: string; token: string }>()
);

export const resetPasswordSuccess = createAction(
  '[User] Reset Password Success',
  props<{ message: string }>()
);

export const resetPasswordFailure = createAction(
  '[User] Reset Password Failure',
  props<{ error: any }>()
);

