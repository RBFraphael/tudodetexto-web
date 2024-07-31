import { Api } from "../lib/Client";

export interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials) => {
    return Api.post(`/auth/login`, credentials);
}

export const me = async () => {
    return Api.get(`/auth/me`);
}