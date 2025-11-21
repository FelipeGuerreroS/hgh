'use client'

import { useMemo, useState } from 'react'

import SiteHeader from '@/components/layout/site-header'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee, employeesByCompany } from '@/data/employees'

export default function EmployeeManagement({ params }: { params: { companyId: string } }) {
  const employeesSeed = employeesByCompany[params.companyId] || employeesByCompany.default
  const [employees, setEmployees] = useState<Employee[]>(employeesSeed)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.paternalLastName} ${employee.maternalLastName}`.toLowerCase()
      const term = searchTerm.toLowerCase()

      return (
        employee.rut.toLowerCase().includes(term) ||
        fullName.includes(term) ||
        employee.role.toLowerCase().includes(term)
      )
    })
  }, [employees, searchTerm])

  const handleCreate = (newEmployee: Employee) => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
    setIsDialogOpen(false)
  }

  const handleUpdate = (updatedEmployee: Employee) => {
    setEmployees(employees.map((employee) => employee.id === updatedEmployee.id ? updatedEmployee : employee))
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Gestión de Empleados</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <Input
            type="text"
            placeholder="Buscar por RUT, nombre o cargo..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="max-w-sm w-full"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentEmployee(null)}>Agregar empleado</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentEmployee ? 'Editar empleado' : 'Agregar nuevo empleado'}</DialogTitle>
              </DialogHeader>
              <EmployeeForm
                employee={currentEmployee}
                onSubmit={currentEmployee ? handleUpdate : handleCreate}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre completo</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{`${employee.firstName} ${employee.paternalLastName} ${employee.maternalLastName}`}</TableCell>
                  <TableCell>{employee.rut}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setCurrentEmployee(employee)
                          setIsDialogOpen(true)
                        }}
                      >
                        Editar
                      </Button>
                      <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleDelete(employee.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

function EmployeeForm({ employee, onSubmit }: { employee: Employee | null, onSubmit: (employee: Employee) => void }) {
  const [formData, setFormData] = useState<Employee>(employee || {
    id: 0,
    firstName: '',
    paternalLastName: '',
    maternalLastName: '',
    rut: '',
    role: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="firstName">Nombres</Label>
        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="paternalLastName">Apellido paterno</Label>
        <Input id="paternalLastName" name="paternalLastName" value={formData.paternalLastName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="maternalLastName">Apellido materno</Label>
        <Input id="maternalLastName" name="maternalLastName" value={formData.maternalLastName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="rut">RUT</Label>
        <Input id="rut" name="rut" value={formData.rut} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="role">Cargo</Label>
        <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  )
}
