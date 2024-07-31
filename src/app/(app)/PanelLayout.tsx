import React, { ReactNode } from "react";
import Logo from "@/assets/logo-reduced.png";
import Image from "next/image";

export default function PanelLayout({ children, menu }: { children: ReactNode, menu: ReactNode }) {
    return (
        <div className="panel d-flex flex-column vh-100">
            <header className="d-flex flex-row align-items-center shadow">
                <div className="logo flex-grow-0 flex-shrink-0 p-3">
                    <Image src={Logo} alt="Cris Oliveira - Tudo de Texto" className="img-fluid" />
                </div>
                <div className="header-content flex-grow-1"></div>
            </header>
            <div className="wrapper flex-grow-1 d-flex flex-row">
                <aside className="sidenav flex-grow-0 flex-shrink-0 p-2 d-flex flex-column gap-2">
                    {menu}
                </aside>
                <main className="content flex-grow-1 p-3">
                    {children}
                </main>
            </div>
        </div>
    );
}