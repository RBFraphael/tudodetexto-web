'use client';

import { IUser } from "@/interfaces/IUser";
import { IVipArea } from "@/interfaces/IVipArea";
import { Alert } from "@/lib/Alert";
import { getUser } from "@/services/admin/UsersService";
import { getVipAreas, postAddStudentVipArea, postRemoveStudentVipArea } from "@/services/admin/VipAreasService";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import StudentVipAreaForm from "../StudentVipAreaForm";

export default function Student({ params }: { params: { user_id: string } }) {
    const router = useRouter();
    const [student, setStudent] = useState<IUser | null>(null);
    const [vipAreas, setVipAreas] = useState<IVipArea[]>([]);

    useEffect(() => {
        loadStudent();
        loadVipAreas();
    }, []);

    const loadStudent = () => {
        let query = new URLSearchParams({
            with: "vipAreas"
        });

        getUser(params.user_id, query).then((res: AxiosResponse<IUser>) => {
            setStudent(res.data);
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro durante a obtenção dos dados do aluno. Por favor, tente novamente."
            }).then(() => {
                router.push("/admin/alunos");
            });
        });
    };

    const loadVipAreas = () => {
        let query = new URLSearchParams({
            no_paginate: "true"
        });

        getVipAreas(query).then((res: AxiosResponse<IVipArea[]>) => {
            setVipAreas(res.data);
        });
    };

    const addVipArea = () => {
        Alert({
            title: "Atribuir Área VIP ao Aluno",
            html: <StudentVipAreaForm vipAreas={vipAreas} onSubmit={onAddVipArea} />,
            showConfirmButton: false
        });
    };

    const onAddVipArea = (data: any) => {
        postAddStudentVipArea(data.vip_area_id, student!.id!).then((res: AxiosResponse<any>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: `Área VIP atribuída com sucesso ao usuário.`
            }).then(() => {
                loadStudent();
                loadVipAreas();
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data.message ?? "Ocorreu um erro ao atribuir a área VIP ao aluno. Por favor, tente novamente."
            });
        });
    };

    const removeVipArea = (vipArea: IVipArea) => {
        Alert({
            icon: "question",
            title: "Tem certeza?",
            text: "Tem certeza que deseja remover a Área VIP do aluno?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim, remover",
            cancelButtonText: "Não, cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                postRemoveStudentVipArea(vipArea.id!, student!.id!).then((res: AxiosResponse<any>) => {
                    Alert({
                        icon: "success",
                        title: "Sucesso",
                        text: `Área VIP removida com sucesso do usuário.`
                    }).then(() => {
                        loadStudent();
                        loadVipAreas();
                    });
                }).catch((err: AxiosError<any>) => {
                    Alert({
                        icon: "error",
                        title: "Erro",
                        text: err.response?.data.message ?? "Ocorreu um erro ao remover a área VIP do aluno. Por favor, tente novamente."
                    });
                });
            }
        });
    }

    return student ? (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <h2>Dados do Aluno {student.first_name} {student.last_name}</h2>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Nome:</p>
                        <h5>{student.first_name}</h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Sobrenome:</p>
                        <h5>{student.last_name}</h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">CPF:</p>
                        <h5>
                            <PatternFormat format="###.###.###-##" displayType="text" value={student.document_number} />
                        </h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Data de Nascimento:</p>
                        <h5>{dayjs(student.birthdate).format("DD/MM/YYYY")}</h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">E-mail:</p>
                        <h5>{student.email}</h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Telefone:</p>
                        <h5>
                            <PatternFormat format="(##) ####-####" displayType="text" value={student.phone} />
                        </h5>
                    </div>
                    <div className="mb-3">
                        <p className="text-muted text-uppercase small mb-0">Celular:</p>
                        <h5>
                            <PatternFormat format="(##) # ####-####" displayType="text" value={student.cellphone} />
                        </h5>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex flex-row gap-2 justify-content-between mb-4">
                        <h2>Áreas VIP do Aluno</h2>
                        <div>
                            <button className="btn btn-primary" onClick={addVipArea}>Atribuir</button>
                        </div>
                    </div>

                    <ul className="list-unstyled">
                        {student.vip_areas?.map((vipArea: IVipArea, index: number) => (
                            <li key={index} className="mb-2">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <p className="text-uppercase m-0 fw-bold">&bull; {vipArea.name}</p>
                                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => removeVipArea(vipArea)}>Remover</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : null;
}