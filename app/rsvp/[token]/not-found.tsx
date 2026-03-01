export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-beige-50 to-beige-100 px-4">
      <div className="card max-w-md text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-gray-400 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
          </svg>
        </div>
        <h2 className="heading-2 mb-4">Link Inválido</h2>
        <p className="text-gray-600 mb-6">
          Este link de confirmação não é válido ou expirou.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Se você recebeu este link recentemente, por favor entre em contato conosco.
        </p>
        <a href="/" className="btn-primary">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}
