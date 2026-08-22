'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

const BUCKET = 'gallery'

type SiteInfo = {
  name: string
  description: string
  whatsapp: string
  location: string
  profileImage: string
}

export default function InfoAdminPage() {
  const supabase = createClient()

  const [info, setInfo] = useState<SiteInfo>({
    name: 'Ingrid Lady Barber',
    description:
      'Barbería y formación profesional. Cortes, barba y cursos de barbería y peluquería.',
    whatsapp: '',
    location: '',
    profileImage: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInfo() {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('site_info')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data) {
        setInfo({
          name: data.name ?? '',
          description: data.description ?? '',
          whatsapp: data.whatsapp ?? '',
          location: data.location ?? '',
          profileImage: data.profile_image ?? '',
        })
      }

      setLoading(false)
    }

    loadInfo()
  }, [supabase])

  function updateField(field: keyof SiteInfo, value: string) {
    setInfo((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Solo se pueden subir imágenes.')
      return
    }

    setUploading(true)
    setMessage('')
    setError('')

    try {
      const extension = file.name.split('.').pop() || 'jpg'
      const fileName = `perfil-${Date.now()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName)

      setInfo((current) => ({
        ...current,
        profileImage: data.publicUrl,
      }))

      setMessage('Imagen subida correctamente. No olvides guardar.')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('No se pudo subir la imagen.')
      }
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function saveInfo() {
    setSaving(true)
    setMessage('')
    setError('')

    const { data: existing } = await supabase
      .from('site_info')
      .select('id')
      .limit(1)
      .maybeSingle()

    let error

    if (existing?.id) {
      const result = await supabase
        .from('site_info')
        .update({
          name: info.name,
          description: info.description,
          whatsapp: info.whatsapp,
          location: info.location,
          profile_image: info.profileImage,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      error = result.error
    } else {
      const result = await supabase.from('site_info').insert({
        name: info.name,
        description: info.description,
        whatsapp: info.whatsapp,
        location: info.location,
        profile_image: info.profileImage,
      })

      error = result.error
    }

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    setMessage('Información guardada correctamente.')
    setSaving(false)
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <p className="text-sm text-white/40">
          Cargando información...
        </p>
      </main>
    )
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
              Información
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

      <section className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
        <div className="rounded-3xl border border-[#c9a96e]/20 bg-[#111] p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
            Perfil
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Información de tu página
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Modificá estos datos desde acá sin tocar el código.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-xl border border-[#c9a96e]/20 bg-[#c9a96e]/10 px-4 py-3 text-sm text-[#e2c88f]">
              {message}
            </div>
          )}

          <div className="mt-8 space-y-6">
            <div>
              <label className="text-sm font-bold">
                Nombre
              </label>

              <input
                value={info.name}
                onChange={(e) =>
                  updateField('name', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/50"
                placeholder="Ingrid Lady Barber"
              />
            </div>

            <div>
              <label className="text-sm font-bold">
                Descripción
              </label>

              <textarea
                value={info.description}
                
                onChange={(e) =>
                  updateField('description', e.target.value)
                }
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/50"
                placeholder="Escribí una descripción..."
              />
            </div>

            <div>
              <label className="text-sm font-bold">
                WhatsApp
              </label>

              <input
                value={info.whatsapp}
                onChange={(e) =>
                  updateField('whatsapp', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/50"
                placeholder="5493442..."
              />

              <p className="mt-2 text-xs text-white/30">
                Ingresá el número con código de país.
              </p>
            </div>

            <div>
              <label className="text-sm font-bold">
                Ubicación
              </label>

              <input
                value={info.location}
                onChange={(e) =>
                  updateField('location', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#c9a96e]/50"
                placeholder="Concepción del Uruguay, Entre Ríos"
              />
            </div>

            <div>
              <label className="text-sm font-bold">
                Foto de perfil
              </label>

              <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center">
                {info.profileImage ? (
                  <img
                    src={info.profileImage}
                    alt="Foto de perfil"
                    className="h-32 w-32 rounded-2xl object-cover border border-[#c9a96e]/30"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.025] text-4xl">
                    👤
                  </div>
                )}

                <label className="cursor-pointer rounded-full border border-white/10 px-5 py-3 text-center text-sm font-bold transition hover:border-[#c9a96e]/40 hover:text-[#c9a96e]">
                  {uploading
                    ? 'Subiendo...'
                    : 'Cambiar foto'}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={saveInfo}
              disabled={saving}
              className="w-full rounded-full bg-[#c9a96e] px-6 py-4 text-sm font-bold text-black transition hover:bg-[#e2c88f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? 'Guardando...'
                : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}