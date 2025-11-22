'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'

import SiteHeader from '@/components/layout/site-header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { companies } from '@/data/companies'

const statusLabels: Record<string, string> = {
  active: 'Activa',
  inactive: 'Inactiva',
}

const countryFlags: Record<string, string> = {
  'Estados Unidos': '🇺🇸',
  'Reino Unido': '🇬🇧',
  'Alemania': '🇩🇪',
}

export default function Dashboard() {
  const router = useRouter()

  const handleCompanyClick = (companyId: number) => {
    router.push(`/employees/${companyId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-8 py-10 md:py-12">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Portafolio</p>
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Empresas</h1>
          </div>
          <p className="text-sm text-muted-foreground">Explora el portafolio corporativo</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const isActive = company.status === 'active'

            return (
              <Card
                key={company.id}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg ring-1 ring-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl"
                onClick={() => handleCompanyClick(company.id)}
              >
                <Image
                  src={company.logo}
                  alt={`Logo de ${company.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out grayscale saturate-0 group-hover:scale-110 group-hover:grayscale-0 group-hover:saturate-100"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-white/20 transition ${isActive ? 'bg-emerald-400 group-hover:ring-emerald-400/40' : 'bg-red-400 group-hover:ring-red-400/40'}`}
                      title={statusLabels[company.status]}
                      aria-label={statusLabels[company.status]}
                    />
                    <span
                      role="img"
                      aria-label={`Bandera de ${company.country}`}
                      title={company.country}
                      className="text-xl drop-shadow"
                    >
                      {countryFlags[company.country] ?? '🏳️'}
                    </span>
                  </div>

                  <div className="space-y-4 text-white drop-shadow-md">
                    <CardHeader className="p-0">
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur text-lg font-semibold uppercase">
                          {company.name.charAt(0)}
                        </div>
                        <span>{company.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3 p-0 text-sm text-white/90">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" aria-hidden />
                        <span className="font-semibold tracking-tight">{company.employees.toLocaleString('es-ES')}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
