'use client';

import { IVipArea } from "@/interfaces/IVipArea";
import { getVipAreas } from "@/services/student/VipAreasService";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentMenu() {
    const [vipAreas, setVipAreas] = useState<IVipArea[]>([]);

    useEffect(() => {
        getVipAreas(new URLSearchParams({ no_paginate: "true" })).then((res: AxiosResponse<IVipArea[]>) => {
            setVipAreas(res.data);
        });
    }, []);

    return (
        <>
            <Link href="/aluno/dashboard" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Dashboard
            </Link>
            <hr />
            {vipAreas.map((vipArea: IVipArea, index: number) => (
                <Link key={index} href={`/aluno/vip/${vipArea.id}`} className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                    {vipArea.name}
                </Link>
            ))}
            <hr />
            <Link href="/aluno/minha-conta" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Minha Conta
            </Link>
            <Link href="/logout" className="btn btn-outline-dark w-100 text-start border-0 fw-bold">
                Sair
            </Link>
        </>
    );
}