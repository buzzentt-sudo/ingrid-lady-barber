'use client';
import Image from 'next/image';

import { useState } from 'react';

const WHATSAPP = 'https://wa.me/5493442474708';
const whatsappMessage = (message: string) =>
  `${WHATSAPP}?text=${encodeURIComponent(message)}`;

const services = [
  {
    number: '01',
    title: 'Corte',
    description: 'Cortes personalizados y adaptados a tu estilo.',
    price: '$8.000',
  },
  {
    number: '02',
    title: 'Corte + Barba',
    description: 'Una combinación completa para renovar tu look.',
    price: '$11.000',
  },
  {
    number: '03',
    title: 'Barba',
    description: 'Perfilado, definición y terminación prolija.',
    price: '$5.000',
  },
  {
    number: '04',
    title: 'Premium',
    description: 'Una experiencia completa con atención al detalle.',
    price: '$10.000',
  },
];

const testimonials = [
  {
    text: 'Excelente atención y un resultado increíble. Se nota la dedicación.',
    name: 'Cliente',
  },
  {
    text: 'Muy buena onda y excelente trabajo. Volvería sin dudarlo.',
    name: 'Cliente',
  },
  {
    text: 'Me encantó el resultado. Todo muy profesional.',
    name: 'Cliente',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8">
          <nav className="glass premium-border flex items-center justify-between rounded-2xl px-5 py-4">
            <a href="#" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#c9a96e]/50">
                <Image
                  src="/logo.jpg"
                  alt="Logo de Ingrid Lady Barber"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-bold tracking-[0.18em]">
                  INGRID
                </p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                  Lady Barber
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#servicios"
                className="text-sm text-white/55 transition hover:text-white"
              >
                Servicios
              </a>

              <a
                href="#curso"
                className="text-sm text-white/55 transition hover:text-white"
              >
                Curso
              </a>

              <a
                href="#galeria"
                className="text-sm text-white/55 transition hover:text-white"
              >
                Trabajos
              </a>

              <a
                href="#sobre-mi"
                className="text-sm text-white/55 transition hover:text-white"
              >
                Sobre mí
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-[#e2c88f]"
              >
                Reservar
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg md:hidden"
              aria-label="Menú"
            >
              {menuOpen ? '×' : '☰'}
            </button>
          </nav>

          {menuOpen && (
            <div className="glass premium-border mt-2 rounded-2xl p-5 md:hidden">
              <div className="flex flex-col gap-5">
                <a href="#servicios" onClick={closeMenu}>
                  Servicios
                </a>
                <a href="#curso" onClick={closeMenu}>
                  Curso
                </a>
                <a href="#galeria" onClick={closeMenu}>
                  Trabajos
                </a>
                <a href="#sobre-mi" onClick={closeMenu}>
                  Sobre mí
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#c9a96e] px-5 py-3 text-center font-bold text-black"
                >
                  Reservar turno
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/[0.07] blur-[100px]" />
          <div className="absolute right-[-150px] top-[15%] h-[400px] w-[400px] rounded-full border border-[#c9a96e]/10" />
          <div className="absolute bottom-[-180px] left-[-120px] h-[400px] w-[400px] rounded-full border border-white/[0.04]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c9a96e]" />
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
                Barbería & Formación
              </p>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                ✂️ Primera mujer barbera de Entre Ríos
              </p>
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[86px]">
              Tu estilo.
              <br />
              <span className="text-[#c9a96e]">Tu identidad.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
              Cortes, barba y formación profesional en un espacio donde cada
              detalle está pensado para vos.
            </p>

            <div className="mt-7 max-w-2xl rounded-2xl border border-[#c9a96e]/20 bg-[#c9a96e]/[0.05] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c9a96e]">
                🎓 Título nacional + matrícula profesional
              </p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Formación respaldada por la Escuela de Peluquería y Afines del
                Centro Profesional de Peluqueros y Peinadoras de Concordia,
                Entre Ríos.
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                Personería Jurídica N.º 672
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-pulse-gold rounded-full bg-[#c9a96e] px-7 py-4 text-center text-sm font-bold text-black transition hover:scale-105"
              >
                Reservar mi turno →
              </a>

              <a
                href="#servicios"
                className="rounded-full border border-white/15 px-7 py-4 text-center text-sm font-bold transition hover:border-white/40 hover:bg-white/[0.04]"
              >
                Ver servicios
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-7 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-bold">01</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                  Estilo
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">02</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                  Precisión
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">03</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                  Experiencia
                </p>
              </div>
            </div>
          </div>

          {/* LOGO / VISUAL PLACEHOLDER */}
          <div className="animate-fade-in flex justify-center lg:justify-end">
            <div className="relative flex aspect-square w-full max-w-[460px] items-center justify-center">
              <div className="absolute inset-5 rounded-full border border-[#c9a96e]/20" />
              <div className="absolute inset-12 rounded-full border border-white/[0.07]" />

              <div className="gold-glow relative flex h-[72%] w-[72%] flex-col items-center justify-center rounded-full border border-[#c9a96e]/30 bg-[#101010]">
                <div className="flex flex-col items-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border border-[#c9a96e]/40 bg-black">
                    <Image
                      src="/logo.jpg"
                      alt="Logo de Ingrid Lady Barber"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-5 text-2xl font-bold tracking-[0.12em]">
                    INGRID
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/35">
                    Lady Barber
                  </p>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 rounded-2xl border border-white/10 bg-[#111]/90 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Atención
                </p>
                <p className="mt-1 text-sm font-bold">Personalizada</p>
              </div>

              <div className="absolute bottom-10 left-0 rounded-2xl border border-white/10 bg-[#111]/90 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Barbería
                </p>
                <p className="mt-1 text-sm font-bold text-[#c9a96e]">
                  Profesional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-white/10 bg-[#0d0d0d] py-5">
        <div className="flex justify-center gap-8 overflow-hidden px-6 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-white/30 sm:gap-14">
          <span>Estilo</span>
          <span>✦</span>
          <span>Precisión</span>
          <span>✦</span>
          <span>Confianza</span>
          <span>✦</span>
          <span>Formación</span>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
                Servicios
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Elegí tu próximo look.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/40">
              Cada servicio está pensado para resaltar tu estilo y cuidar
              hasta el último detalle.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.number}
                className="group premium-border relative overflow-hidden rounded-2xl bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/30 hover:bg-white/[0.04] sm:p-9"
              >
                <div className="absolute right-[-20px] top-[-30px] text-[110px] font-bold text-white/[0.025]">
                  {service.number}
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="text-xs font-bold text-[#c9a96e]">
                        {service.number}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold">
                        {service.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-[#c9a96e]/20 px-3 py-1.5 text-sm font-bold text-[#c9a96e]">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-5 max-w-md text-sm leading-6 text-white/40">
                    {service.description}
                  </p>

                  <a
                    href={whatsappMessage(`Hola Ingrid 👋 Quisiera reservar un turno para ${service.title}. ¿Qué días y horarios tenés disponibles?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition group-hover:text-[#c9a96e]"
                  >
                    Reservar
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="border-y border-white/10 bg-[#0d0d0d] py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
              Trabajos
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Tu próximo look empieza acá.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/40">
              Este espacio queda preparado para mostrar los cortes, trabajos y
              resultados reales de Ingrid.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className={`group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#161616] ${
                  item === 1 || item === 4 ? 'lg:col-span-2' : ''
                }`}
              >
                <img
                  src={`/trabajo-ingrid-${item}.jpg`}
                  alt={`Trabajo de barbería realizado por Ingrid ${item}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURSO */}
      <section id="curso" className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-[#c9a96e]/20 bg-[#111]">
            <div className="absolute right-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#c9a96e]/10 blur-[80px]" />

            <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9a96e] text-sm font-bold text-black">
                    ✦
                  </span>

                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                    Formación profesional
                  </p>
                </div>

                <h2 className="mt-7 max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
                  Cursos de barbería 💈
                  <br />
                  <span className="text-[#c9a96e]">& peluquería ✂️</span>
                </h2>

                <p className="mt-7 max-w-xl leading-7 text-white/60">
                  Aprendé de manera presencial, desde cero y con acompañamiento.
                  Una formación pensada para que puedas aprender, practicar y
                  mejorar tus técnicas de corte.
                </p>

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                    Inversión
                  </p>

                  <p className="mt-2 text-4xl font-bold text-[#c9a96e]">
                    $50.000
                    <span className="ml-2 text-base font-normal text-white/40">
                      por mes
                    </span>
                  </p>
                </div>

                <a
                  href={whatsappMessage("Hola Ingrid 👋 Quisiera recibir información sobre los cursos presenciales de barbería y peluquería. ¿Me contás cómo puedo inscribirme?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex rounded-full bg-[#c9a96e] px-7 py-4 text-sm font-bold text-black transition hover:scale-105"
                >
                  Quiero inscribirme →
                </a>
              </div>

              <div className="grid gap-4 self-center">
                <div className="rounded-2xl border border-[#c9a96e]/20 bg-white/[0.025] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a96e]">
                    Duración
                  </p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="font-bold text-white">
                        3 meses
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        Formación intensiva y práctica.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="font-bold text-white">
                        7 meses
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        Ideal si necesitás más tiempo para aprender y practicar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#c9a96e]/20 bg-[#c9a96e]/5 p-6">
                  <p className="text-lg font-bold text-white">
                    ✂️ ¿Te cuesta cortar?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/50">
                    No te preocupes. Podés aprender desde cero, practicar y
                    avanzar a tu ritmo con acompañamiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO DEL CURSO */}
      <section className="border-y border-white/10 bg-[#0d0d0d] py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
              Conocé nuestra formación
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
              Aprendé haciendo. ✂️
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Mirá un poco de lo que podés aprender en nuestros cursos
              presenciales de barbería y peluquería.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-sm overflow-hidden rounded-[28px] border border-[#c9a96e]/20 bg-black shadow-2xl">
            <div className="border-b border-white/10 px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a96e]">
                Ingrid en clase ✂️
              </p>
              <p className="mt-1 text-sm text-white/45">
                Conocé cómo es una clase de formación.
              </p>
            </div>

            <video
              className="h-auto w-full"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/curso-ingrid.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>

          <div className="mx-auto mt-8 max-w-sm overflow-hidden rounded-[28px] border border-[#c9a96e]/20 bg-black shadow-2xl">
            <div className="border-b border-white/10 px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a96e]">
                Mirá la formación
              </p>
              <p className="mt-1 text-sm text-white/45">
                Una muestra de lo que podés aprender.
              </p>
            </div>

            <video
              className="h-auto w-full"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/curso-barberia.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </div>
      </section>

      {/* SOBRE INGRID */}
      <section id="sobre-mi" className="border-y border-white/10 bg-[#0d0d0d] py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[30px] border border-[#c9a96e]/10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]">
              <img
                src="/ingrid.jpg"
                alt="Ingrid, barbera y formadora"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
              Sobre Ingrid
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Más que un corte.
              <br />
              <span className="text-white/35">Una experiencia.</span>
            </h2>

            <p className="mt-7 leading-8 text-white/50">
              Soy Ingrid, barbera y apasionada por este oficio. Creo que un
              buen corte no se trata solamente de cómo se ve, sino de cómo te
              hace sentir.
            </p>

            <p className="mt-5 leading-8 text-white/50">
              Por eso cada cliente recibe una atención personalizada,
              buscando encontrar un estilo que realmente lo represente.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 p-5">
                <p className="text-2xl font-bold text-[#c9a96e]">01</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/35">
                  Atención
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <p className="text-2xl font-bold text-[#c9a96e]">02</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/35">
                  Pasión
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
              Experiencias
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Lo dicen quienes ya pasaron.
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="premium-border rounded-2xl bg-white/[0.025] p-7"
              >
                <div className="flex gap-1 text-[#c9a96e]">
                  ★ ★ ★ ★ ★
                </div>

                <p className="mt-6 text-sm leading-7 text-white/50">
                  “{testimonial.text}”
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a96e] text-xs font-bold text-black">
                    C
                  </div>

                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/25">
                      Cliente
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#c9a96e] py-24 text-black">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-black/50">
            Tu próximo look
          </p>

          <h2 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
            ¿Reservamos?
          </h2>

          <p className="mx-auto mt-6 max-w-lg leading-7 text-black/55">
            Escribime por WhatsApp y coordinamos tu próximo turno.
          </p>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:scale-105"
          >
            Reservar por WhatsApp →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060606] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
          <div>
            <p className="font-bold tracking-[0.18em]">INGRID</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/25">
              Lady Barber
            </p>
          </div>

          <p className="text-xs text-white/25">
            © 2026 Ingrid Lady Barber · Barbería & Formación
          </p>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-xl font-bold text-white shadow-2xl transition hover:scale-110"
      >
        W
      </a>
    </main>
  );
}
