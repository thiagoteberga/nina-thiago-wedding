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
          <div className="w-24 h-px bg-beige-400 mx-auto my-12" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-beige-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-2 text-center mb-12">Momentos Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/foto-1.jpg"
                alt="Momento 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/foto-2.jpg"
                alt="Momento 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/foto-3.jpg"
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
              <div className="text-gold-500 mb-4">
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
              <p className="text-gray-600">07 de Março de 2026 às 11h</p>
              <p className="text-gray-500 text-sm mt-1">Sábado</p>
            </div>

            {/* Location */}
            <div className="card text-center">
              <div className="text-gold-500 mb-4">
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
                href="https://maps.app.goo.gl/gCojG7WNq5jRM9Xq9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:text-gold-600 text-sm mt-2 inline-block"
              >
                Ver no mapa →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gifts Section */}
      <section className="py-20 px-4 bg-beige-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 mb-8">Presentear o Casal</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A sua presença no nosso casamento é o que realmente importa para nós.
              Ter você celebrando esse momento ao nosso lado já é o maior presente que poderíamos receber.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Se, ainda assim, você quiser nos presentear de alguma forma, disponibilizamos a opção de contribuição via PIX.
              Mas fique totalmente à vontade — isso é apenas para quem desejar.
            </p>

            <div className="card max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Chave PIX</h3>
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chave:</p>
                  <p className="text-lg font-medium text-gray-800">teberga@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nome:</p>
                  <p className="text-lg font-medium text-gray-800">Thiago Oliveira Teberga</p>
                </div>
              </div>

              <div className="w-full h-px bg-beige-200 my-8" />

              <p className="text-sm text-gray-600 mb-4">Se preferir, você também pode usar o QR Code abaixo:</p>
              <div className="relative w-64 h-64 mx-auto bg-white rounded-lg shadow-inner p-4">
                <Image
                  src="/images/qr-code.png"
                  alt="QR Code PIX"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-beige-100 to-gold-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-2 mb-6">Confirme sua Presença</h2>
          <p className="text-gray-700 text-lg mb-8">
            Pedimos a gentileza de confirmar sua presença até o dia <strong>04 de Março de 2026</strong>.
          </p>
          <p className="text-gray-600 mb-8">
            Se você recebeu o link de confirmação, clique nele para confirmar sua presença.
            <br />
            Caso não tenha recebido, entre em contato conosco.
          </p>
          <div className="card">
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
          <p className="text-2xl font-lavonia mb-4">Nina & Thiago</p>
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
