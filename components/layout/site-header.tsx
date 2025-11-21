'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export default function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">EMS</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary-foreground"
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Cambiar tema</span>
          </Button>
          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:text-primary hover:bg-primary-foreground/90">
            Perfil
          </Button>
          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:text-primary hover:bg-primary-foreground/90">
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
