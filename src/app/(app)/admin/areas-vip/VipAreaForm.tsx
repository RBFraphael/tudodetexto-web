import { IForm } from "@/interfaces/IForm";
import { IVipArea } from "@/interfaces/IVipArea";
import { useForm } from "react-hook-form";

export default function VipAreaForm({ model, onSubmit, onCancel, loading, submitting }: IForm<IVipArea>) {
    const form = useForm({
        defaultValues: model
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-12">
                    <div className="form-floating mb-4">
                        <input {...form.register("name", { required: true })} type="text" className="form-control" placeholder="Nome" />
                        <label htmlFor="name">Nome</label>
                    </div>
                    <button type="submit" className="btn btn-success">{model ? `Atualizar` : `Adicionar`} Área VIP</button>
                </div>
            </div>
        </form>
    );
}