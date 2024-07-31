import { ReactNode } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-3">
                        <Image src={Logo} alt="Cris Oliveira - Tudo de Texto" className="img-fluid mb-3" />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}