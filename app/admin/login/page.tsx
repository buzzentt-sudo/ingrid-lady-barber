'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    console.log('LOGIN DATA:', data)
    console.log('LOGIN ERROR:', error)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#c9a96e]/40">
            <img
              src="/logo.jpg"
              alt="Ingrid Lady Barber"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a96e]">
            Panel privado
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Ingrid Lady Barber
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Administrá tu página
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-2xl"
        >

          <div>
            <label className="text-sm font-medium text-white/70">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="Correo electrónico"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/60"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-white/70">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Contraseña"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/60"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-full bg-[#c9a96e] px-5 py-3.5 text-sm font-bold text-black transition hover:bg-[#e2c88f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-white/35 transition hover:text-white"
          >
            ← Volver a la página
          </a>
        </div>

      </div>
    </main>
  )
}