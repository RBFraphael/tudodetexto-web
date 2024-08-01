'use client';

import { ReactNode, useContext, useEffect, useState } from "react";
import PanelLayout from "../PanelLayout";
import { UserContext } from "@/contexts/UserContext";
import { UserRole } from "@/interfaces/IUser";
import { useRouter } from "next/navigation";
import StudentMenu from "./StudentMenu";

export default function StudentLayout({ children }: { children: ReactNode }) {
    const { user } = useContext(UserContext);
    const [render, setRender] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (user && user?.role !== UserRole.STUDENT) {
            router.push("/");
        } else {
            setRender(true);
        }
    }, [user]);

    return render ? (
        <PanelLayout menu={<StudentMenu />}>
            {children}
        </PanelLayout>
    ) : null;
}