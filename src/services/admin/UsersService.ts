import { UserRole } from "@/interfaces/IUser";
import { Api } from "@/lib/Client";

export const getUsers = async (query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    query.set("role", UserRole.ADMIN);
    return Api.get(`/admin/users?${query.toString()}`);
}