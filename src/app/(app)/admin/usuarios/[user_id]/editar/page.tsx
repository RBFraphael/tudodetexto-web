export default function EditUser({ params }: { params: { user_id: string } }) {
    return (
        <h2>Editar Usuário | {params.user_id}</h2>
    );
}