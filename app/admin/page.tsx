'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/admin/login')
        return
      }

      setEmail(user.email ?? '')
      setLoading(false)
    }

    checkUser()
  }, [router, supabase])

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <p className="text-sm text-white/40">
          Cargando panel...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-white/10 bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
              Panel de administración
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Ingrid Lady Barber
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#c9a96e]/40 hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="rounded-3xl border border-[#c9a96e]/20 bg-[#111] p-7 sm:p-10">

          <p className="text-sm text-white/40">
            Sesión iniciada como
          </p>

          <p className="mt-2 font-medium text-[#c9a96e]">
            {email}
          </p>

          <h2 className="mt-10 text-3xl font-bold">
            Administrá tu página
          </h2>

          <p className="mt-3 max-w-xl leading-7 text-white/45">
            Desde este panel vas a poder modificar los servicios,
            precios, galería e información de tu página sin tocar código.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* SERVICIOS */}

            <a
              href="/admin/services"
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#c9a96e]/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl">
                    ✂️
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Servicios
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Agregá, editá o eliminá servicios y modificá sus precios.
                  </p>
                </div>

                <span className="text-2xl text-white/30 transition group-hover:text-[#c9a96e]">
                  →
                </span>
              </div>

              <div className="mt-6 inline-flex rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-bold text-black">
                Gestionar servicios
              </div>
            </a>

            {/* GALERÍA */}

            <a
              href="/admin/gallery"
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#c9a96e]/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl">
                    📸
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Galería
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Subí nuevas fotos de tus trabajos o eliminá las que ya no quieras mostrar.
                  </p>
                </div>

                <span className="text-2xl text-white/30 transition group-hover:text-[#c9a96e]">
                  →
                </span>
              </div>

              <div className="mt-6 inline-flex rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-bold text-black">
                Gestionar galería
              </div>
            </a>

            {/* INFORMACIÓN */}

            <a
              href="/admin/info"
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#c9a96e]/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl">
                    👤
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Información
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Modificá información básica de tu perfil y de la página.
                  </p>
                </div>

                <span className="text-2xl text-white/30 transition group-hover:text-[#c9a96e]">
                  →
                </span>
              </div>

              <div className="mt-6 inline-flex rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-bold text-black">
                Gestionar información
              </div>
            </a>

          </div>
        </div>
      </section>
    </main>
  )
}