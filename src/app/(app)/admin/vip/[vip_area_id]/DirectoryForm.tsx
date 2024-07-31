import { IDirectory } from "@/interfaces/IDirectory";
import { IForm } from "@/interfaces/IForm";
import { useForm } from "react-hook-form";

export default function DirectoryForm({ model, onSubmit, onCancel, loading, submitting }: IForm<IDirectory>) {
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
                    <button type="submit" className="btn btn-success">{model ? `Atualizar` : `Adicionar`} Pasta</button>
                </div>
            </div>
        </form>
    );
}