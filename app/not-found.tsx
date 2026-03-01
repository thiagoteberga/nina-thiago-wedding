export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-beige-50 to-beige-100 px-4">
      <div className="text-center">
        <h1 className="heading-1 mb-4">404</h1>
        <h2 className="heading-3 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          O link que você está procurando pode estar incorreto ou expirado.
        </p>
        <a href="/" className="btn-primary">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}
