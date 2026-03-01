import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 mb-8">Nosso Grande Dia</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            É com grande alegria que convidamos você para celebrar conosco o nosso casamento.
            Este será um momento especial em nossas vidas e queremos compartilhá-lo com as pessoas que amamos.
          </p>
          <div className="w-24 h-px bg-gold-400 mx-auto my-12" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-2 text-center mb-12">Momentos Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
                alt="Momento 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop"
                alt="Momento 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2087&auto=format&fit=crop"
                alt="Momento 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center mb-12">Detalhes do Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date */}
            <div className="card text-center">
              <div className="text-gold-600 mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data</h3>
              <p className="text-gray-600">07 de Março de 2026</p>
              <p className="text-gray-500 text-sm mt-1">Sábado</p>
            </div>

            {/* Location */}
            <div className="card text-center">
              <div className="text-gold-600 mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local</h3>
              <p className="text-gray-600">Chácara Amata</p>
              <p className="text-gray-500 text-sm mt-1">
                Estrada Sebastião Vieira Machado, 1056<br />
                Lago Azul - Pindamonhangaba - SP
              </p>
              <a
                href="https://maps.google.com/?q=Estrada+Sebastião+Vieira+Machado+1056+Pindamonhangaba+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 text-sm mt-2 inline-block"
              >
                Ver no mapa →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-beige-100 to-gold-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-2 mb-6">Confirme sua Presença</h2>
          <p className="text-gray-700 text-lg mb-8">
            Pedimos a gentileza de confirmar sua presença até o dia <strong>20 de Fevereiro de 2026</strong>.
          </p>
          <p className="text-gray-600 mb-8">
            Se você recebeu o link de confirmação, clique nele para confirmar sua presença.
            <br />
            Caso não tenha recebido, entre em contato conosco.
          </p>
          <div className="card bg-white/80">
            <p className="text-sm text-gray-600 mb-4">
              💍 Para confirmar, utilize o link personalizado que você recebeu via WhatsApp ou SMS.
            </p>
            <p className="text-xs text-gray-500">
              Cada família possui um link único para confirmação.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-beige-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl font-serif mb-4">Nina & Thiago</p>
          <p className="text-sm text-beige-300">07.03.2026</p>
          <div className="w-16 h-px bg-gold-400 mx-auto my-6" />
          <p className="text-xs text-beige-400">
            Feito com 💛 para nosso grande dia
          </p>
        </div>
      </footer>
    </main>
  )
}
