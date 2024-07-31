'use client';

import { UserRole } from "@/interfaces/IUser";
import { Alert } from "@/lib/Alert";
import { login } from "@/services/AuthService";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const form = useForm();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = (data: any) => {
        setSubmitting(true);

        login(data).then((res: AxiosResponse<any>) => {
            localStorage.setItem("access_token", res.data.access_token);
            switch (res.data.user.role) {
                case UserRole.STUDENT:
                    router.push("/aluno");
                    break;
                case UserRole.ADMIN:
                    router.push("/admin");
                    break;
                default:
                    localStorage.clear();
                    window.location.reload();
                    break;
            }
        }).catch((err: AxiosError<any>) => {
            Alert({
                icon: "error",
                title: "Erro",
                text: err.response?.data?.message ?? "Ocorreu um erro durante seu login. Por favor, tente novamente."
            });
        }).finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <>
            <h3 className="mb-3">Faça seu login</h3>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="form-floating mb-1">
                    <input {...form.register("email", { required: true })} type="email" className="form-control" placeholder="Endereço de e-mail" />
                    <label htmlFor="email">Endereço de e-mail</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...form.register("password", { required: true })} type="password" className="form-control" placeholder="Senha" />
                    <label htmlFor="password">Senha</label>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-success w-100 mb-2">
                        <FontAwesomeIcon icon={faLock} fixedWidth /> Entrar
                    </button>
                    <Link href="/recuperar-senha" className="btn btn-link">Esqueci minha senha</Link>
                    <p className="text-muted">&copy; {dayjs().format("YYYY")} Tudo de Texto</p>
                </div>
            </form>
        </>
    )
}