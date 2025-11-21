'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy data for companies
const companies = [
  { id: 1, name: 'TechCorp', employees: 150, country: 'USA', status: 'Active', logo: '/techcorp-logo.svg' },
  { id: 2, name: 'GlobalSoft', employees: 75, country: 'UK', status: 'Active', logo: '/globalsoft-logo.svg' },
  { id: 3, name: 'InnoSystems', employees: 200, country: 'Germany', status: 'Inactive', logo: '/innosystems-logo.svg' },
]

export default function Dashboard() {
  const router = useRouter()

  const handleCompanyClick = (companyId: number) => {
    router.push(`/employees/${companyId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Companies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCompanyClick(company.id)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <img src={company.logo} alt={`${company.name} logo`} className="w-8 h-8" />
                  <span>{company.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Employees: {company.employees}</p>
                <p>Country: {company.country}</p>
              </CardContent>
              <CardFooter>
                <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                  {company.status}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

