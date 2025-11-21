'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Dummy data for employees
const initialEmployees = [
  { id: 1, nombres: 'John', apellido_paterno: 'Doe', apellido_materno: 'Smith', rut: '12345678-9', cargo: 'Developer' },
  { id: 2, nombres: 'Jane', apellido_paterno: 'Doe', apellido_materno: 'Johnson', rut: '98765432-1', cargo: 'Designer' },
]

export default function EmployeeManagement({ params }: { params: { companyId: string } }) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<any>(null)

  const filteredEmployees = employees.filter(employee => 
    employee.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${employee.nombres} ${employee.apellido_paterno} ${employee.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = (newEmployee: any) => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
    setIsDialogOpen(false)
  }

  const handleUpdate = (updatedEmployee: any) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp))
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <Input
            type="text"
            placeholder="Search by RUT, name, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm w-full"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentEmployee(null)}>Add Employee</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
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
                <TableHead>Name</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{`${employee.nombres} ${employee.apellido_paterno} ${employee.apellido_materno}`}</TableCell>
                  <TableCell>{employee.rut}</TableCell>
                  <TableCell>{employee.cargo}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="w-full sm:w-auto" onClick={() => {
                        setCurrentEmployee(employee)
                        setIsDialogOpen(true)
                      }}>
                        Edit
                      </Button>
                      <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleDelete(employee.id)}>Delete</Button>
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

function EmployeeForm({ employee, onSubmit }: { employee: any, onSubmit: (employee: any) => void }) {
  const [formData, setFormData] = useState(employee || {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: '',
    cargo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombres">First Name</Label>
        <Input id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="apellido_paterno">Paternal Last Name</Label>
        <Input id="apellido_paterno" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="apellido_materno">Maternal Last Name</Label>
        <Input id="apellido_materno" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="rut">RUT</Label>
        <Input id="rut" name="rut" value={formData.rut} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="cargo">Position</Label>
        <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}

