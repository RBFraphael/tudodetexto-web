'use client';

import { IPaginatedData } from "@/interfaces/IPaginatedData";
import { IUser, UserRole } from "@/interfaces/IUser";
import { Alert } from "@/lib/Alert";
import { deleteUser, getUsers } from "@/services/admin/UsersService";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { PatternFormat } from "react-number-format";

export default function Students() {
    const [students, setStudents] = useState<IPaginatedData<IUser>>();

    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<string>("id");

    const columns: TableColumn<IUser>[] = [
        {
            id: "id",
            name: "ID",
            selector: (user: IUser) => user.id ?? "",
            sortable: true
        },
        {
            id: "first_name",
            name: "Nome",
            selector: (user: IUser) => `${user.first_name} ${user.last_name}`
        },
        {
            id: "email",
            name: "E-mail",
            selector: (user: IUser) => user.email
        },
        {
            id: "document_number",
            name: "CPF",
            cell: (user: IUser) => (
                <PatternFormat format="###.###.###-##" displayType="text" value={user.document_number} />
            ),
        },
        {
            id: "cellphone",
            name: "Celular",
            cell: (user: IUser) => (
                <PatternFormat format="(##) # ####-####" displayType="text" value={user.cellphone} />
            ),
        },
        {
            id: "actions",
            name: "",
            cell: (user: IUser) => (
                <div className="d-flex flex-row justify-content-end gap-1">
                    <Link href={`/admin/alunos/${user.id}`} title="Ver" className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faEye} fixedWidth />
                    </Link>
                    <Link href={`/admin/alunos/${user.id}/editar`} title="Editar" className="btn btn-dark btn-sm">
                        <FontAwesomeIcon icon={faPencil} fixedWidth />
                    </Link>
                    <button onClick={() => onDeleteStudent(user)} title="Excluir" className="btn btn-danger btn-sm">
                        <FontAwesomeIcon icon={faTrash} fixedWidth />
                    </button>
                </div>
            )
        }
    ];

    const loadStudents = () => {
        let query = new URLSearchParams({
            page: page.toString(),
            per_page: perPage.toString(),
            order: order,
            order_by: sortColumn,
            role: UserRole.STUDENT
        });
        getUsers(query).then((res: AxiosResponse<IPaginatedData<IUser>>) => {
            setStudents(res.data);
        });
    };

    useEffect(() => {
        loadStudents();
    }, [page, perPage, order, sortColumn]);

    const onSort = (column: TableColumn<IUser>, direction: "asc" | "desc", rows: IUser[]) => {
        setSortColumn(column.id?.toString() ?? "id");
        setOrder(direction);
    };

    const onDeleteStudent = (user: IUser) => {
        Alert({
            icon: "question",
            title: "Tem certeza?",
            text: `Tem certeza que deseja excluir o aluno ${user.first_name} ${user.last_name}? ATENÇÃO: Essa ação é irreversível.`,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não, cancelar",
            confirmButtonText: "Sim, excluir"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user.id!).then(() => {
                    Alert({
                        icon: "success",
                        title: "Sucesso",
                        text: `O aluno ${user.first_name} ${user.last_name} foi excluído com sucesso.`
                    }).then(() => {
                        loadStudents();
                    });
                }).catch((err: AxiosError<any>) => {
                    Alert({
                        icon: "error",
                        title: "Erro",
                        text: err.response?.data.message ?? "Ocorreu um erro durante a exclusão do aluno. Por favor, tente novamente."
                    });
                });
            }
        });
    }

    return (
        <div className="container-fluid">
            <div className="row align-items-center mb-4">
                <div className="col-12 col-lg-6">
                    <h2>Alunos</h2>
                </div>
                <div className="col-12 col-lg-6 text-end">
                    <Link href="/admin/alunos/novo" className="btn btn-primary fw-bold">Novo Aluno</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DataTable
                        data={students?.data ?? []}
                        columns={columns}
                        pagination
                        paginationServer
                        paginationTotalRows={students?.total}
                        onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
                        onChangePage={(page) => setPage(page)}
                        progressPending={loading}
                        sortServer
                        onSort={onSort}
                        defaultSortAsc={true}
                        defaultSortFieldId={"id"}
                    />
                </div>
            </div>
        </div>
    );
}