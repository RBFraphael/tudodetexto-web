import { Api } from "@/lib/Client";

export const getVipAreas = async (query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/student/vip-areas?${query.toString()}`);
}

export const getVipArea = async (id: string, query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/student/vip-areas/${id}?${query.toString()}`);
}
