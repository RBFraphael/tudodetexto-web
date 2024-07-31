export default function User({ params }: { params: { user_id: string } }) {
    return (
        <h2>Dados do Usuário | {params.user_id}</h2>
    );
}