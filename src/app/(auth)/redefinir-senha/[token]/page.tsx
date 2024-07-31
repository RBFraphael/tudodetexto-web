export default function PasswordReset({ params }: { params: { token: string } }) {
    return (
        <h3>Redefinição de Senha | {params.token}</h3>
    )
}