import { IDirectory } from "@/interfaces/IDirectory";
import { Api } from "@/lib/Client";

export const postAddDirectory = async (name: string, parent?: IDirectory) => {
    let data: any = {
        name
    };

    if (parent) {
        data = {
            name,
            parent_directory_id: parent.id!
        }
    }

    return Api.post(`/admin/directories`, data);
}

export const getDirectory = async (id: string, query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    return Api.get(`/admin/directories/${id}?${query.toString()}`);
}