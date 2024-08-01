import { IDirectory } from "@/interfaces/IDirectory";
import { Api } from "@/lib/Client";

export const getDirectory = async (id: string, query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/student/directories/${id}?${query.toString()}`);
}