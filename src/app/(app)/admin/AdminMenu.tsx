'use client';

import { IVipArea } from "@/interfaces/IVipArea";
import { getVipAreas } from "@/services/admin/VipAreasService";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminMenu() {
    const [vipAreas, setVipAreas] = useState<IVipArea[]>([]);

    useEffect(() => {
        getVipAreas(new URLSearchParams({ no_paginate: "true" })).then((res: AxiosResponse<IVipArea[]>) => {
            setVipAreas(res.data);
        });
    }, []);

    return (
        <>
            <Link href="/admin/dashboard" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Dashboard
            </Link>
            <Link href="/admin/alunos" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Alunos
            </Link>
            <Link href="/admin/areas-vip" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Áreas VIP
            </Link>
            <Link href="/admin/usuarios" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Usuários
            </Link>
            <hr />
            {vipAreas.map((vipArea: IVipArea, index: number) => (
                <Link key={index} href={`/admin/vip/${vipArea.id}`} className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                    {vipArea.name}
                </Link>
            ))}
            <hr />
            <Link href="/admin/minha-conta" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Minha Conta
            </Link>
            <Link href="/logout" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Sair
            </Link>
        </>
    );
}