import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectChangePasswordLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectChangePasswordError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

