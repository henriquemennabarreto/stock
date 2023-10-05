import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUserRequest, ICreateUserResponse, IUpdateUserRequest, IUpdateUserResponse, IUser } from '../models/user';
import { IGoogleJwtRequest, ILoginRequest, ILoginResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<any>(`${environment.apiUrl}/users/${userId}`);
  }

  addUser(user: ICreateUserRequest): Observable<ICreateUserResponse> {
    return this.http.post<any>(`${environment.apiUrl}/users`, user);
  }

  updateUser(userId: string, user: IUpdateUserRequest): Observable<IUpdateUserResponse> {
    return this.http.put<any>(`${environment.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${userId}`);
  }

  loginUser(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, data);
  }

  getGoogleJwt(data: IGoogleJwtRequest): Observable<ILoginResponse> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, data);
  }
}
