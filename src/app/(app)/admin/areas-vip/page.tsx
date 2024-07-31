'use client';

import { IPaginatedData } from "@/interfaces/IPaginatedData";
import { IVipArea } from "@/interfaces/IVipArea";
import { Alert } from "@/lib/Alert";
import { deleteVipArea, getVipAreas, postAddVipArea, putUpdateVipArea } from "@/services/admin/VipAreasService";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import VipAreaForm from "./VipAreaForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function VipAreas() {
    const [vipAreas, setVipAreas] = useState<IPaginatedData<IVipArea>>();

    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<string>("id");

    const columns: TableColumn<IVipArea>[] = [
        {
            id: "id",
            name: "ID",
            selector: (vipArea: IVipArea) => vipArea.id ?? "",
            sortable: true
        },
        {
            id: "name",
            name: "Nome",
            selector: (vipArea: IVipArea) => vipArea.name
        },
        {
            id: "students",
            name: "Alunos",
            selector: (vipArea: IVipArea) => vipArea.users?.length ?? 0
        },
        {
            id: "actions",
            name: "",
            cell: (vipArea: IVipArea) => (
                <div className="d-flex flex-row gap-1 justify-content-end text-end">
                    <button className="btn btn-sm btn-primary" onClick={() => editVipArea(vipArea)}>
                        <FontAwesomeIcon icon={faPencil} fixedWidth />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDeleteVipArea(vipArea)}>
                        <FontAwesomeIcon icon={faTrash} fixedWidth />
                    </button>
                </div>
            )
        }
    ];

    const loadVipAreas = () => {
        let query = new URLSearchParams({
            page: page.toString(),
            per_page: perPage.toString(),
            order: order,
            order_by: sortColumn
        });
        getVipAreas(query).then((res: AxiosResponse<IPaginatedData<IVipArea>>) => {
            setVipAreas(res.data);
        });
    };

    useEffect(() => {
        loadVipAreas();
    }, [page, perPage, order, sortColumn]);

    const onSort = (column: TableColumn<IVipArea>, direction: "asc" | "desc", rows: IVipArea[]) => {
        setSortColumn(column.id?.toString() ?? "id");
        setOrder(direction);
    };

    const addVipArea = () => {
        Alert({
            title: "Cadastrar Área VIP",
            html: <VipAreaForm onSubmit={onAddVipArea} />,
            showConfirmButton: false
        });
    };

    const editVipArea = (vipArea: IVipArea) => {
        Alert({
            title: "Editar Área VIP",
            html: <VipAreaForm onSubmit={onEditVipArea} model={vipArea} />,
            showConfirmButton: false
        });
    }

    const onDeleteVipArea = (vipArea: IVipArea) => {
        Alert({
            icon: "question",
            title: "Confirmação",
            text: `Tem certeza que deseja excluir a área VIP ${vipArea.name}? Essa ação não pode ser desfeita!`,
            showConfirmButton: true,
            confirmButtonText: "Sim, excluir",
            showCancelButton: true,
            cancelButtonText: "Não, cancelar"
        }).then((status) => {
            if (status.isConfirmed) {
                deleteVipArea(vipArea.id!).then((res: AxiosResponse<any>) => {
                    Alert({
                        icon: "success",
                        title: "Sucesso",
                        text: `Área VIP ${vipArea.name} excluída com sucesso.`
                    }).then(() => {
                        loadVipAreas();
                    });
                }).catch((err: AxiosError<any>) => {
                    Alert({
                        icon: "error",
                        title: "Erro",
                        text: `Ocorreu um erro durante a exclusão da área VIP. Por favor, tente novamente.`
                    });
                });
            }
        });
    };

    const onAddVipArea = (data: any) => {
        postAddVipArea(data.name).then((res: AxiosResponse<IVipArea>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: `Área VIP ${res.data.name} cadastrada com sucesso.`
            }).then(() => {
                loadVipAreas();
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: `Ocorreu um erro durante o cadastro da área VIP. Por favor, tente novamente.`
            });
        });
    };

    const onEditVipArea = (data: any) => {
        putUpdateVipArea(data.id, data).then((res: AxiosResponse<IVipArea>) => {
            Alert({
                icon: "success",
                title: "Sucesso",
                text: `Área VIP ${res.data.name} atualizada com sucesso.`
            }).then(() => {
                loadVipAreas();
            });
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: `Ocorreu um erro durante a atualização da área VIP. Por favor, tente novamente.`
            });
        });
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center mb-4">
                <div className="col-12 col-lg-6">
                    <h2>Áreas VIP</h2>
                </div>
                <div className="col-12 col-lg-6 text-end">
                    <button onClick={addVipArea} className="btn btn-primary fw-bold">Nova Área VIP</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DataTable
                        data={vipAreas?.data ?? []}
                        columns={columns}
                        pagination
                        paginationServer
                        paginationTotalRows={vipAreas?.total}
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