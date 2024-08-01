'use client';

import { postRegisterUser } from "@/services/admin/UsersService";
import StudentForm from "../StudentForm";
import { IUser, UserRole } from "@/interfaces/IUser";
import { AxiosError, AxiosResponse } from "axios";
import { Alert } from "@/lib/Alert";
import { useRouter } from "next/navigation";

export default function NewStudent() {
    const router = useRouter();

    const onSubmit = (data: any) => {
        postRegisterUser({
            ...data,
            role: UserRole.STUDENT
        }).then((res: AxiosResponse<IUser>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: "O aluno foi cadastrado com sucesso."
            }).then(() => {
                router.push(`/admin/alunos/${res.data.id}`);
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro ao realizar o cadastro do aluno. Por favor, tente novamente."
            });
        });
    };

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <h2>Novo Aluno</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StudentForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}