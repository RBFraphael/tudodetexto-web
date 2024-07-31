'use client';

import { IVipArea } from "@/interfaces/IVipArea";
import { Alert } from "@/lib/Alert";
import { getVipArea } from "@/services/admin/VipAreasService";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DirectoryForm from "./DirectoryForm";
import { getDirectory, postAddDirectory } from "@/services/admin/DirectoryService";
import { IDirectory } from "@/interfaces/IDirectory";
import DirectoryBrowser from "./DirectoryBrowser";
import Swal from "sweetalert2";
import { postUploadFile } from "@/services/admin/FilesService";
import { IFile } from "@/interfaces/IFile";

export default function VipArea({ params }: { params: { vip_area_id: string } }) {

    const [vipArea, setVipArea] = useState<IVipArea | null>(null);
    const [directory, setDirectory] = useState<IDirectory | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const addDirectory = () => {
        Alert({
            title: "Nova Pasta",
            html: <DirectoryForm onSubmit={onAddDirectory} />,
            showConfirmButton: false
        });
    };

    const onAddDirectory = (data: any) => {
        postAddDirectory(data.name, directory!).then((res: AxiosResponse<IDirectory>) => {
            Swal.close();
            onChangeDirectory(directory!);
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data?.message ?? "Ocorreu um erro ao criar a pasta. Tente novamente."
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

    const uploadFile = () => {
        fileInputRef.current?.click();
    }

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget;
        if (target.files && target.files.length > 0) {
            for (let i = 0; i < target.files.length; i++) {
                let file = target.files.item(i);
                postUploadFile(file!, directory!).then((res: AxiosResponse<IFile>) => {
                    onChangeDirectory(directory!);
                }).catch((err: AxiosError<any>) => {
                    Alert({
                        icon: "error",
                        title: "Erro",
                        text: err.response?.data?.message ?? "Ocorreu um erro ao enviar o arquivo. Tente novamente."
                    });
                });
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-12 d-flex flex-row justify-content-between align-items-center">
                    <h2>{vipArea?.name}</h2>
                    <div className="d-flex flex-row gap-1 justify-content-end">
                        <input type="file" name="file" id="file" style={{ width: 0, height: 0, opacity: 0 }} ref={fileInputRef} multiple onChange={onSelectFile} />
                        <button className="btn btn-primary fw-bold" onClick={addDirectory}>Nova Pasta</button>
                        <button className="btn btn-secondary fw-bold" onClick={uploadFile}>Enviar Arquivo</button>
                    </div>
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