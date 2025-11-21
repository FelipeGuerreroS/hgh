export type Employee = {
  id: number
  firstName: string
  paternalLastName: string
  maternalLastName: string
  rut: string
  role: string
}

export const employeesByCompany: Record<string, Employee[]> = {
  default: [
    { id: 1, firstName: 'John', paternalLastName: 'Doe', maternalLastName: 'Smith', rut: '12345678-9', role: 'Developer' },
    { id: 2, firstName: 'Jane', paternalLastName: 'Doe', maternalLastName: 'Johnson', rut: '98765432-1', role: 'Designer' },
  ],
}
