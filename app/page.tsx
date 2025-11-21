'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from './logo-hgh.png';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate credentials against an API
    // For demo purposes, we'll just redirect to the main page
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="m-auto w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl">
        <div className="space-y-2 text-center">
          <Image src={logo} alt="HGH Logo" width={100} height={100} className="mx-auto" />
          <h1 className="text-2xl font-bold">Employee Management System</h1>
          <p className="text-muted-foreground">Please sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  )
}

