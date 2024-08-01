'use client';

import { IVipArea } from "@/interfaces/IVipArea";
import { Alert } from "@/lib/Alert";
import { getVipArea } from "@/services/student/VipAreasService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDirectory } from "@/interfaces/IDirectory";
import DirectoryBrowser from "./DirectoryBrowser";
import { getDirectory } from "@/services/student/DirectoryService";

export default function VipArea({ params }: { params: { vip_area_id: string } }) {

    const [vipArea, setVipArea] = useState<IVipArea | null>(null);
    const [directory, setDirectory] = useState<IDirectory | null>(null);

    useEffect(() => {
        loadVipArea();
    }, []);

    const loadVipArea = () => {
        const query = new URLSearchParams({
            with: "directory.files,directory.children,directory.parent"
        });

        getVipArea(params.vip_area_id, query).then((res: AxiosResponse<IVipArea>) => {
            setVipArea(res.data);
            setDirectory(res.data.directory!);
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data?.message ?? "Ocorreu um erro ao exibir a Área VIP. Tente novamente."
            });
        });
    };

    const onChangeDirectory = (dir: IDirectory) => {
        let query = new URLSearchParams({
            with: "parent,children,files"
        });
        getDirectory(dir.id!, query).then((res: AxiosResponse<IDirectory>) => {
            setDirectory(res.data);
        });
    }

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-12 d-flex flex-row justify-content-between align-items-center">
                    <h2>{vipArea?.name}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="text-muted">{directory?.path}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DirectoryBrowser root={directory!} onChangeDirectory={onChangeDirectory} />
                </div>
            </div>
        </div>
    );
}