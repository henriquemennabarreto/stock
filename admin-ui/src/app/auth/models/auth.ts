import { ICreateUserResponse } from "./user";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}
export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterResponse extends ICreateUserResponse {
    id: string;
    name: string;
    email: string;
    created_at: string;
}
