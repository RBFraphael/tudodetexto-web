'use client';

import { postRegisterUser } from "@/services/admin/UsersService";
import { IUser, UserRole } from "@/interfaces/IUser";
import { AxiosError, AxiosResponse } from "axios";
import { Alert } from "@/lib/Alert";
import { useRouter } from "next/navigation";
import UserForm from "../UserForm";

export default function NewUser() {
    const router = useRouter();

    const onSubmit = (data: any) => {
        postRegisterUser({
            ...data,
            role: UserRole.ADMIN
        }).then((res: AxiosResponse<IUser>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: "O usuário foi cadastrado com sucesso."
            }).then(() => {
                router.push(`/admin/usuaris/${res.data.id}`);
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro ao realizar o cadastro do usuário. Por favor, tente novamente."
            });
        });
    };

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <h2>Novo Usuário</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <UserForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}