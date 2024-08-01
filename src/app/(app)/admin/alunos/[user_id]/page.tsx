'use client';

import { IUser } from "@/interfaces/IUser";
import { Alert } from "@/lib/Alert";
import { getUser } from "@/services/admin/UsersService";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

export default function Student({ params }: { params: { user_id: string } }) {
    const router = useRouter();
    const [student, setStudent] = useState<IUser | null>(null);

    useEffect(() => {
        getUser(params.user_id).then((res: AxiosResponse<IUser>) => {
            setStudent(res.data);
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro durante a obtenção dos dados do aluno. Por favor, tente novamente."
            }).then(() => {
                router.push("/admin/alunos");
            });
        })
    }, []);

    return student ? (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="h2">
                        Dados do Aluno {student.first_name} {student.last_name}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Nome:</p>
                        <h4>{student.first_name}</h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Sobrenome:</p>
                        <h4>{student.last_name}</h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">CPF:</p>
                        <h4>
                            <PatternFormat format="###.###.###-##" displayType="text" value={student.document_number} />
                        </h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Data de Nascimento:</p>
                        <h4>{dayjs(student.birthdate).format("DD/MM/YYYY")}</h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">E-mail:</p>
                        <h4>{student.email}</h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Telefone:</p>
                        <h4>
                            <PatternFormat format="(##) ####-####" displayType="text" value={student.phone} />
                        </h4>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Celular:</p>
                        <h4>
                            <PatternFormat format="(##) # ####-####" displayType="text" value={student.cellphone} />
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}