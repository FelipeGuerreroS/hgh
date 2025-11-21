export type Company = {
  id: number
  name: string
  employees: number
  country: string
  status: 'active' | 'inactive'
  logo: string
}

export const companies: Company[] = [
  { id: 1, name: 'TechCorp', employees: 150, country: 'Estados Unidos', status: 'active', logo: '/images/logo-hgh.png' },
  { id: 2, name: 'GlobalSoft', employees: 75, country: 'Reino Unido', status: 'active', logo: '/images/logo-hgh.png' },
  { id: 3, name: 'InnoSystems', employees: 200, country: 'Alemania', status: 'inactive', logo: '/images/logo-hgh.png' },
]
