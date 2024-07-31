export default function Student({ params }: { params: { user_id: string } }) {
    return (
        <h2>Dados do Aluno | {params.user_id}</h2>
    );
}