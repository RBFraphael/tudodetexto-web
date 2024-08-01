'use client';

import { useRouter } from "next/navigation";

export default function Student() {
    const router = useRouter();
    router.push("/aluno/dashboard");
}