"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Establecer autenticación en localStorage
    localStorage.setItem("isAuthenticated", "true")
    // Redirigir al formulario principal
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 flex items-center justify-between p-8">
      {/* Logo/Brand Section */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-white text-7xl font-bold tracking-wider">SIKUAR</h1>
      </div>

      {/* Login Form */}
      <div className="flex-shrink-0 w-96">
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingrese su email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium text-base rounded-lg"
              >
                Ingresar
              </Button>

              <div className="text-center">
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Support Section */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 text-white">
        <span className="text-sm">Con el apoyo de</span>
        <span className="text-white font-bold text-lg">Starknet</span>
      </div>
    </div>
  )
}
