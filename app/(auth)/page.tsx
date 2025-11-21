'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="m-auto w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl bg-card text-card-foreground">
        <div className="space-y-2 text-center">
          <Image src="/images/logo-hgh.png" alt="Logo HGH" width={100} height={100} className="mx-auto" />
          <h1 className="text-2xl font-bold">Sistema de Gestión de Empleados</h1>
          <p className="text-muted-foreground">Por favor, inicia sesión en tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Iniciar sesión</Button>
        </form>
        <div className="text-center">
          <a href="#" className="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  )
}
