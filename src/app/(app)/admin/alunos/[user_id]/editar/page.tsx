'use client';

import { getUser, putUpdateUser } from "@/services/admin/UsersService";
import StudentForm from "../../StudentForm";
import { IUser } from "@/interfaces/IUser";
import { AxiosError, AxiosResponse } from "axios";
import { Alert } from "@/lib/Alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudent({ params }: { params: { user_id: string } }) {
    const router = useRouter();
    const [student, setStudent] = useState<IUser | null>(null);

    useEffect(() => {
        getUser(params.user_id).then((res: AxiosResponse<IUser>) => {
            setStudent(res.data);
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro ao obter os dados do aluno. Por favor, tente novamente."
            }).then(() => {
                router.push("/admin/alunos");
            });
        });
    }, []);

    const onSubmit = (data: any) => {
        putUpdateUser(data.id, data).then((res: AxiosResponse<IUser>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: "O aluno foi atualizado com sucesso."
            }).then(() => {
                router.push(`/admin/alunos/${res.data.id}`);
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro ao realizar a atualização do aluno. Por favor, tente novamente."
            });
        });
    };

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <h2>Editar Aluno</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {student ? (
                        <StudentForm model={student} onSubmit={onSubmit} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}