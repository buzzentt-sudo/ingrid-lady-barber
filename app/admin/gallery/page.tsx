'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type GalleryImage = {
  name: string
  url: string
}

const BUCKET = 'gallery'

export default function GalleryAdminPage() {
  const supabase = createClient()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadImages() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list('', {
        limit: 100,
        sortBy: {
          column: 'created_at',
          order: 'desc',
        },
      })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const galleryImages = (data ?? [])
      .filter((file) => file.name !== '.emptyFolderPlaceholder')
      .map((file) => {
        const { data: publicUrl } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(file.name)

        return {
          name: file.name,
          url: publicUrl.publicUrl,
        }
      })

    setImages(galleryImages)
    setLoading(false)
  }

  useEffect(() => {
    loadImages()
  }, [])

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (!files || files.length === 0) {
      return
    }

    setUploading(true)
    setMessage('')
    setError('')

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Solo se pueden subir imágenes.')
          continue
        }

        const extension = file.name.split('.').pop() || 'jpg'

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}.${extension}`

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (error) {
          throw error
        }
      }

      setMessage('Las imágenes se subieron correctamente.')
      await loadImages()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Ocurrió un error al subir las imágenes.')
      }
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function deleteImage(fileName: string) {
    const confirmed = window.confirm(
      '¿Seguro que querés eliminar esta imagen?'
    )

    if (!confirmed) {
      return
    }

    setDeleting(fileName)
    setMessage('')
    setError('')

    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([fileName])

    if (error) {
      setError(error.message)
      setDeleting(null)
      return
    }

    setMessage('Imagen eliminada correctamente.')
    setDeleting(null)

    await loadImages()
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
              Galería
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
        <div className="rounded-3xl border border-[#c9a96e]/20 bg-[#111] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                Trabajos
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Administrar galería
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Subí fotos de tus trabajos y aparecerán en la galería de tu
                página.
              </p>
            </div>

            <label className="cursor-pointer rounded-full bg-[#c9a96e] px-6 py-3.5 text-center text-sm font-bold text-black transition hover:bg-[#e2c88f]">
              {uploading ? 'Subiendo...' : '＋ Subir imágenes'}

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

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
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-10 text-center text-white/40">
              Cargando galería...
            </div>
          ) : images.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-14 text-center">
              <div className="text-5xl">
                📸
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Todavía no hay imágenes
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Subí la primera foto para comenzar a armar la galería.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
                >
                  <div className="aspect-square bg-black">
                    <img
                      src={image.url}
                      alt="Trabajo de Ingrid Lady Barber"
                      className="h-full w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>

                  <div className="border-t border-white/10 p-4">
                    <p className="mb-3 break-all text-xs text-white/30">
                      {image.name}
                    </p>

                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 block text-xs text-[#c9a96e] hover:underline"
                    >
                      Abrir imagen directamente
                    </a>

                    <button
                      onClick={() => deleteImage(image.name)}
                      disabled={deleting === image.name}
                      className="w-full rounded-full bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                      {deleting === image.name
                        ? 'Eliminando...'
                        : 'Eliminar imagen'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}