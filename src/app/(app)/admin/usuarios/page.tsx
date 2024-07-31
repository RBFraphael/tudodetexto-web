'use client';

import { IPaginatedData } from "@/interfaces/IPaginatedData";
import { IUser } from "@/interfaces/IUser";
import { getUsers } from "@/services/admin/UsersService";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export default function Users() {
    const [users, setUsers] = useState<IPaginatedData<IUser>>();

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
            selector: (user: IUser) => user.document_number,
        },
        {
            id: "cellphone",
            name: "Celular",
            selector: (user: IUser) => user.cellphone,
        }
    ];

    const loadUsers = () => {
        let query = new URLSearchParams({
            page: page.toString(),
            per_page: perPage.toString(),
            order: order,
            order_by: sortColumn
        });
        getUsers(query).then((res: AxiosResponse<IPaginatedData<IUser>>) => {
            setUsers(res.data);
        });
    };

    useEffect(() => {
        loadUsers();
    }, [page, perPage, order, sortColumn]);

    const onSort = (column: TableColumn<IUser>, direction: "asc" | "desc", rows: IUser[]) => {
        setSortColumn(column.id?.toString() ?? "id");
        setOrder(direction);
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center mb-4">
                <div className="col-12 col-lg-6">
                    <h2>Usuários</h2>
                </div>
                <div className="col-12 col-lg-6 text-end">
                    <Link href="/admin/usuarios/novo" className="btn btn-primary fw-bold">Novo Usuário</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DataTable
                        data={users?.data ?? []}
                        columns={columns}
                        pagination
                        paginationServer
                        paginationTotalRows={users?.total}
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