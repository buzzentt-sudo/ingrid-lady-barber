'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Service = {
  id: number
  title: string
  description: string
  price: string
  position: number
}

const emptyForm = {
  title: '',
  description: '',
  price: '',
}

export default function ServicesAdminPage() {
  const supabase = createClient()

  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadServices() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('position', { ascending: true })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setServices(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadServices()
  }, [])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function startEditing(service: Service) {
    setEditingId(service.id)

    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
    })

    setMessage('')
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function cancelEditing() {
    setEditingId(null)
    setForm(emptyForm)
    setMessage('')
    setError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setMessage('')
    setError('')

    if (!form.title.trim() || !form.price.trim()) {
      setError('El nombre y el precio son obligatorios.')
      setSaving(false)
      return
    }

    if (editingId !== null) {
      const { error } = await supabase
        .from('services')
        .update({
          title: form.title.trim(),
          description: form.description.trim(),
          price: form.price.trim(),
        })
        .eq('id', editingId)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setMessage('Servicio actualizado correctamente.')
    } else {
      const nextPosition =
        services.length > 0
          ? Math.max(...services.map((service) => service.position)) + 1
          : 1

      const { error } = await supabase
        .from('services')
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          price: form.price.trim(),
          position: nextPosition,
        })

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setMessage('Servicio agregado correctamente.')
    }

    setForm(emptyForm)
    setEditingId(null)
    setSaving(false)

    await loadServices()
  }

  async function deleteService(id: number) {
    const confirmed = window.confirm(
      '¿Seguro que querés eliminar este servicio?'
    )

    if (!confirmed) {
      return
    }

    setError('')
    setMessage('')

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Servicio eliminado correctamente.')

    if (editingId === id) {
      cancelEditing()
    }

    await loadServices()
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-white/10 bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <div>
            <a
              href="/admin"
              className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]"
            >
              ← Panel
            </a>

            <h1 className="mt-2 text-2xl font-bold">
              Servicios
            </h1>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#c9a96e]/40 hover:text-white"
          >
            Ver página
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          <div className="h-fit rounded-3xl border border-[#c9a96e]/20 bg-[#111] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
              {editingId !== null ? 'Editar servicio' : 'Nuevo servicio'}
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {editingId !== null
                ? 'Modificar servicio'
                : 'Agregar servicio'}
            </h2>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">

              <div>
                <label className="text-sm font-medium text-white/70">
                  Nombre
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ej: Corte"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/60"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white/70">
                  Precio
                </label>

                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ej: $15.000"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/60"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white/70">
                  Descripción
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descripción del servicio..."
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/60"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-xl border border-[#c9a96e]/20 bg-[#c9a96e]/10 px-4 py-3 text-sm text-[#e2c88f]">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-[#c9a96e] px-5 py-3.5 text-sm font-bold text-black transition hover:bg-[#e2c88f] disabled:opacity-50"
              >
                {saving
                  ? 'Guardando...'
                  : editingId !== null
                    ? 'Guardar cambios'
                    : 'Agregar servicio'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="w-full rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  Cancelar edición
                </button>
              )}

            </form>
          </div>

          <div>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                Servicios publicados
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {services.length} servicios
              </h2>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center text-white/40">
                Cargando servicios...
              </div>
            ) : services.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center">
                <p className="text-white/50">
                  Todavía no hay servicios.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-bold text-[#c9a96e]">
                            {String(service.position).padStart(2, '0')}
                          </span>

                          <h3 className="text-xl font-bold">
                            {service.title}
                          </h3>

                          <span className="rounded-full border border-[#c9a96e]/20 px-3 py-1 text-sm font-bold text-[#c9a96e]">
                            {service.price}
                          </span>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => startEditing(service)}
                          className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#c9a96e]/40 hover:text-white"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => deleteService(service.id)}
                          className="rounded-full border border-red-500/20 px-4 py-2.5 text-sm font-bold text-red-300 transition hover:bg-red-500/10"
                        >
                          Eliminar
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  )
}