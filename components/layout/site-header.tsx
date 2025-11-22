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
    <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold tracking-tight text-primary-foreground">
            EMS
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Panel</p>
            <h1 className="text-xl font-semibold leading-tight">Employee Management System</h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10"
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Cambiar tema</span>
          </Button>
          <Button
            variant="secondary"
            className="rounded-full border border-white/20 bg-white/10 px-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/70"
          >
            Perfil
          </Button>
          <Button
            variant="secondary"
            className="rounded-full border border-white/20 bg-white/10 px-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/70"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
