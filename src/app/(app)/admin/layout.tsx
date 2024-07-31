'use client';

import { ReactNode, useContext, useEffect, useState } from "react";
import PanelLayout from "../PanelLayout";
import AdminMenu from "./AdminMenu";
import { UserContext } from "@/contexts/UserContext";
import { UserRole } from "@/interfaces/IUser";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user } = useContext(UserContext);
    const [render, setRender] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (user && user?.role !== UserRole.ADMIN) {
            router.push("/");
        } else {
            setRender(true);
        }
    }, [user]);

    return render ? (
        <PanelLayout menu={<AdminMenu />}>
            {children}
        </PanelLayout>
    ) : null;
}