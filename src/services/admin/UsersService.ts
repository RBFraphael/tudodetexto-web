import { IUser, UserRole } from "@/interfaces/IUser";
import { Api } from "@/lib/Client";

export const getUsers = async (query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/admin/users?${query.toString()}`);
}

export const getUser = async (id: string, query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/admin/users/${id}?${query.toString()}`);
}

export const postRegisterUser = async (data: IUser) => {
    return Api.post(`/admin/users`, data);
}

export const putUpdateUser = async (id: string, data: IUser) => {
    return Api.put(`/admin/users/${id}`, data);
}
