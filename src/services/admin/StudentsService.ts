import { UserRole } from "@/interfaces/IUser";
import { Api } from "@/lib/Client";

export const getStudents = async (query?: URLSearchParams) => {
    query = query ?? new URLSearchParams();
    query.set("role", UserRole.STUDENT);
    return Api.get(`/admin/users?${query.toString()}`);
}