import { createAction, props } from '@ngrx/store';
import { ICreateUserRequest, ICreateUserResponse, IUpdateUserRequest, IUpdateUserResponse, IUser } from '../models/user';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout');

export const loadUsers = createAction(
  '[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: IUser[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{ user: ICreateUserRequest }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ response: ICreateUserResponse }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ userId: string, user: IUpdateUserRequest }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ response: IUpdateUserResponse }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: string }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const getUser = createAction(
  '[User] Get User',
  props<{ userId: string }>()
);

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{ user: IUser }>()
);

export const getUserFailure = createAction(
  '[User] Get User Failure',
  props<{ error: any }>()
);

export const getGoogleJwt = createAction(
  '[Auth] Get Google JWT',
  props<{ email: string }>()
);
