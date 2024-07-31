import { Api } from "@/lib/Client";

export const getVipAreas = async (query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/admin/vip-areas?${query.toString()}`);
}

export const getVipArea = async (id: string, query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/admin/vip-areas/${id}?${query.toString()}`);
}

export const postAddVipArea = async (name: string) => {
    return Api.post(`/admin/vip-areas`, { name });
}

export const putUpdateVipArea = async (id: string, data: any) => {
    return Api.put(`/admin/vip-areas/${id}`, data);
}

export const deleteVipArea = async (id: string) => {
    return Api.delete(`/admin/vip-areas/${id}`);
}