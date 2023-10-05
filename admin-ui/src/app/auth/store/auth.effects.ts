import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, 
    private authService: AuthService,
    private router: Router
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUsers),
      switchMap(() =>
        this.authService.getAllUsers().pipe(
          map((users) => AuthActions.loadUsersSuccess({ users })),
          catchError((error) => of(AuthActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      switchMap((action) =>
        this.authService.addUser(action.user).pipe(
          map((response) => AuthActions.createUserSuccess({ response })),
          catchError((error) => of(AuthActions.createUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap((action) =>
        this.authService.updateUser(action.userId, action.user).pipe(
          map((response) => AuthActions.updateUserSuccess({ response })),
          catchError((error) => of(AuthActions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      switchMap((action) =>
        this.authService.deleteUser(action.userId).pipe(
          map(() => AuthActions.deleteUserSuccess({ userId: action.userId })),
          catchError((error) => of(AuthActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((action) =>
        this.authService.getUserById(action.userId).pipe(
          map((user) => AuthActions.getUserSuccess({ user })),
          catchError((error) => of(AuthActions.getUserFailure({ error })))
        )
      )
    )
  );
  
  createUserSuccessNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.createUserSuccess),
      tap(() => {
      })
    );
  }

  createUserFailureNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.createUserFailure),
      tap(() => {
      })
    );
  }

  updateUserSuccessNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.updateUserSuccess),
      tap(() => {
      })
    );
  }

  updateUserFailureNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.updateUserFailure),
      tap(() => {
      })
    );
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.loginUser({ email: action.email, password: action.password }).pipe(
          map((response) => AuthActions.loginSuccess({ token: response.token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.loginFailure({ error: error?.error?.message })))
        )
      )
    )
  );

  navigateAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/produtos/lista']))
    ),
    { dispatch: false } 
  );

  loginSuccessNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
      })
    );
  }

  loginFailureNotification() {
    return this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(() => {
      })
    );
  }

  getGoogleJwt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getGoogleJwt),
      switchMap((action) =>
        this.authService.getGoogleJwt({ email: action.email }).pipe(
          map((response) => AuthActions.loginSuccess({ token: response.token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.loginFailure({ error: error?.error?.message })))
        )
      )
    )
  );

}
