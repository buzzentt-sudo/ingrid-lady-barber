'use client';

import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsapp = 'https://wa.me/5493440000000';

  const services = [
    {
      name: 'Corte clásico',
      description: 'Corte personalizado adaptado a tu estilo.',
      price: '$8.000',
    },
    {
      name: 'Corte + barba',
      description: 'Corte completo acompañado de perfilado de barba.',
      price: '$11.000',
    },
    {
      name: 'Barba',
      description: 'Perfilado y cuidado para una barba prolija.',
      price: '$5.000',
    },
    {
      name: 'Corte premium',
      description: 'Una experiencia completa con detalles y terminación.',
      price: '$10.000',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-xl font-bold tracking-[0.2em]">
            INGRID<span className="text-[#c9a96e]">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#servicios" className="text-sm text-white/70 hover:text-white">
              Servicios
            </a>
            <a href="#curso" className="text-sm text-white/70 hover:text-white">
              Curso
            </a>
            <a href="#sobre-mi" className="text-sm text-white/70 hover:text-white">
              Sobre mí
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e1c48b]"
            >
              Reservar turno
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl md:hidden"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0b0b] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#servicios" onClick={() => setMenuOpen(false)}>
                Servicios
              </a>
              <a href="#curso" onClick={() => setMenuOpen(false)}>
                Curso
              </a>
              <a href="#sobre-mi" onClick={() => setMenuOpen(false)}>
                Sobre mí
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#c9a96e] px-5 py-3 text-center font-semibold text-black"
              >
                Reservar turno
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(201,169,110,0.18),transparent_35%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-28">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-[#c9a96e]">
              Barbería & Formación
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              Tu estilo.
              <br />
              <span className="text-[#c9a96e]">Tu identidad.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              Cortes personalizados, barba y una experiencia pensada para que
              salgas sintiéndote mejor que cuando llegaste.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#c9a96e] px-7 py-4 text-center font-semibold text-black transition hover:scale-105"
              >
                Reservar mi turno →
              </a>

              <a
                href="#servicios"
                className="rounded-full border border-white/20 px-7 py-4 text-center font-semibold transition hover:bg-white hover:text-black"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="border-t border-white/10 bg-[#111111] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a96e]">
              Servicios
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Elegí tu estilo
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#c9a96e]/50 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                      {service.description}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-lg font-bold text-[#c9a96e]">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURSO */}
      <section id="curso" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl border border-[#c9a96e]/20 bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-8 sm:p-12">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a96e]">
                  Formación profesional
                </p>

                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                  Aprendé barbería desde cero.
                </h2>

                <p className="mt-6 leading-7 text-white/60">
                  Un curso pensado para quienes quieren aprender las técnicas
                  fundamentales de barbería y comenzar a desarrollar su propio
                  estilo profesional.
                </p>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block rounded-full bg-[#c9a96e] px-7 py-4 font-semibold text-black transition hover:bg-[#e1c48b]"
                >
                  Quiero información →
                </a>
              </div>

              <div className="grid gap-3">
                {[
                  'Clases prácticas',
                  'Técnicas de corte',
                  'Manejo de herramientas',
                  'Perfilado y barba',
                  'Acompañamiento personalizado',
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9a96e] text-sm font-bold text-black">
                      {index + 1}
                    </span>
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MI */}
      <section id="sobre-mi" className="border-t border-white/10 bg-[#111111] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-[#181818]">
              <div className="text-center">
                <div className="text-7xl">✂️</div>
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-white/30">
                  Foto de Ingrid
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a96e]">
                Sobre mí
              </p>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Hola, soy Ingrid.
              </h2>

              <p className="mt-6 leading-8 text-white/60">
                Soy barbera y apasionada por este oficio. Mi objetivo es que
                cada persona encuentre un estilo que la represente y disfrute
                de una atención personalizada.
              </p>

              <p className="mt-5 leading-8 text-white/60">
                Además de trabajar en barbería, comparto mis conocimientos con
                personas que quieren aprender y dar sus primeros pasos en este
                mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a96e]">
              Opiniones
            </p>
            <h2 className="mt-3 text-4xl font-bold">Lo que dicen mis clientes</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              'Excelente atención y muy buen resultado. Quedé súper conforme.',
              'Muy buena onda y excelente trabajo. La recomiendo totalmente.',
              'Me encantó el resultado. Se nota la dedicación y el cuidado.',
            ].map((text, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="mb-5 text-[#c9a96e]">★★★★★</div>
                <p className="leading-7 text-white/60">“{text}”</p>
                <p className="mt-5 text-sm font-semibold">Cliente</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#c9a96e] py-20 text-black">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            ¿Listo para tu próximo corte?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-black/60">
            Reservá tu turno de forma rápida y empezá a darle forma a tu
            próximo estilo.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 text-center text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 Ingrid Lady Barber. Todos los derechos reservados.</p>
          <p>Barbería & Formación</p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-2xl transition hover:scale-110"
      >
        ☎
      </a>
    </main>
  );
}
