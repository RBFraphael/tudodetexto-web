'use client';

import { IForm } from "@/interfaces/IForm";
import { IUser } from "@/interfaces/IUser";
import { IVipArea } from "@/interfaces/IVipArea";
import { useForm } from "react-hook-form";

interface StudentVipAreaProps {
    onSubmit: (data: any) => void;
    vipAreas: IVipArea[]
}

export default function StudentVipAreaForm({ vipAreas, onSubmit }: StudentVipAreaProps) {
    const form = useForm();

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="row g-4">
                <div className="col-12">
                    <div className="form-floating">
                        <select {...form.register("vip_area_id", { required: true })} className="form-select">
                            <option value="" disabled>Selecione uma Área VIP</option>
                            {vipAreas.map((vipArea: IVipArea, index: number) => (
                                <option key={index} value={vipArea.id}>{vipArea.name}</option>
                            ))}
                        </select>
                        <label htmlFor="vip_area_id">Área VIP *</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-success">Adicionar Área VIP</button>
                </div>
            </div>
        </form>
    );
}