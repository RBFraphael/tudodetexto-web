'use client';

import { UserContext } from "@/contexts/UserContext";
import { IUser, UserRole } from "@/interfaces/IUser";
import { me } from "@/services/AuthService";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    if (localStorage.getItem("access_token")) {
        me().then((res: AxiosResponse<any>) => {
            let user: IUser = res.data;
            setUser(user);
            if (user.role == UserRole.ADMIN) {
                router.push("/admin");
            } else {
                router.push("/aluno");
            }
        }).catch((err: AxiosError<any>) => {
            console.log("Error fetching /auth/me", err);
            router.push("/login");
        });
    } else {
        console.log("access_token not saved");
        router.push("/login");
    }

    return (
        <></>
    );
}
