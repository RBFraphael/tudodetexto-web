import { IVipArea } from "./IVipArea";

export interface IUser {
    id?: string;
    first_name: string;
    last_name: string;
    document_number: string;
    birthdate: string;
    email: string;
    phone: string;
    cellphone: string;
    role: UserRole;
    vip_areas?: IVipArea[];
}

export enum UserRole {
    ADMIN = "admin",
    STUDENT = "student"
}