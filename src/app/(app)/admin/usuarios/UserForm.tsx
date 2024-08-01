'use client';

import { IForm } from "@/interfaces/IForm";
import { IUser } from "@/interfaces/IUser";
import { useForm } from "react-hook-form";

export default function UserForm({ model, onSubmit }: IForm<IUser>) {
    const form = useForm({
        defaultValues: model
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("first_name", { required: true })} type="text" className="form-control" placeholder="Nome*" />
                        <label htmlFor="first_name">Nome*</label>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("last_name", { required: true })} type="text" className="form-control" placeholder="Sobrenome*" />
                        <label htmlFor="last_name">Sobrenome*</label>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("document_number", { required: true })} type="text" className="form-control" placeholder="CPF*" />
                        <label htmlFor="document_number">CPF*</label>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("birthdate", { required: true })} type="date" className="form-control" placeholder="Data de nascimento*" />
                        <label htmlFor="birthdate">Data de nascimento*</label>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("phone", { required: false })} type="phone" className="form-control" placeholder="Telefone" />
                        <label htmlFor="phone">Telefone</label>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="form-floating">
                        <input {...form.register("cellphone", { required: true })} type="phone" className="form-control" placeholder="Celular*" />
                        <label htmlFor="cellphone">Celular*</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input {...form.register("email", { required: true })} type="email" className="form-control" placeholder="E-mail*" />
                        <label htmlFor="email">E-mail*</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-success">{model ? "Atualizar" : "Cadastrar"} Aluno</button>
                </div>
            </div>
        </form>
    );
}