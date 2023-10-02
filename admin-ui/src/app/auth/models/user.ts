export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserResponse {
    user: {
        id: string;
        name: string;
        email: string;
        created_at: string;
    }
}

export interface IUpdateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface IUpdateUserResponse {
    message: string;
}
