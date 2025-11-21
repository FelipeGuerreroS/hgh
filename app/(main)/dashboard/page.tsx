'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import SiteHeader from '@/components/layout/site-header'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { companies } from '@/data/companies'

const statusLabels: Record<string, string> = {
  active: 'Activa',
  inactive: 'Inactiva',
}

export default function Dashboard() {
  const router = useRouter()

  const handleCompanyClick = (companyId: number) => {
    router.push(`/employees/${companyId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Empresas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCompanyClick(company.id)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Image src={company.logo} alt={`Logo de ${company.name}`} width={32} height={32} className="w-8 h-8" />
                  <span>{company.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-foreground">
                <p>Empleados: {company.employees}</p>
                <p>País: {company.country}</p>
              </CardContent>
              <CardFooter>
                <Badge variant={company.status === 'active' ? 'default' : 'secondary'}>
                  {statusLabels[company.status]}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
