import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = (state: any) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);

export const selectAuthToken = createSelector(
  selectAuthState,
  fromAuth.selectToken
);

export const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectError
);
