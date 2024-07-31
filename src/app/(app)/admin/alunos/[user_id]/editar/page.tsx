export default function EditStudent({ params }: { params: { user_id: string } }) {
    return (
        <h2>Editar Aluno | {params.user_id}</h2>
    );
}