"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Calendar, Mic, Camera, Video, FileText, MoreHorizontal, Upload, X, LogOut } from "lucide-react"

export default function DenunciaForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedTime, setSelectedTime] = useState("hoy")
  const [selectedFirstTime, setSelectedFirstTime] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    // Simular verificación de autenticación
    // En una app real, verificarías el token/sesión aquí
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isAuthenticated")
      if (!isLoggedIn) {
        window.location.href = "/login"
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    window.location.href = "/login"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  if (!isAuthenticated) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4">
      {/* Header con logout */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SIKUAR - Sistema de Denuncias</h1>
          <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel Izquierdo - Branding */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-3xl p-8 text-white h-full min-h-[400px] flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Denuncia
              <br />
              Indentificada
            </h1>
            <p className="text-2xl font-bold text-black mt-8">
              Permite
              <br />
              Contactarte
              <br />
              para seguimiento
            </p>
          </div>
        </div>

        {/* Panel Central - Formulario */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Sobre lo que pasó */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sobre lo que pasó</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">
                      Tus datos <span className="text-gray-500 text-sm">(opcional, para recibir ayuda)</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Esta información es secreta.</p>

                    <div className="space-y-3">
                      <Input placeholder="Tu nombre (opcional)" />
                      <Input placeholder="¿Cómo podemos contactarte? (Teléfono, etc.) (opcional)" />
                    </div>
                  </div>
                </div>

                {/* Sobre lo que pasó - Detalles */}
                <div>
                  <h3 className="font-medium mb-4">Sobre lo que pasó</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">¿Cuándo pasó?</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={selectedTime === "hoy" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime("hoy")}
                          className="flex items-center gap-1"
                        >
                          <Sun className="w-4 h-4" />
                          Hoy
                        </Button>
                        <Button
                          variant={selectedTime === "ayer" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime("ayer")}
                          className="flex items-center gap-1"
                        >
                          <Moon className="w-4 h-4" />
                          Ayer
                        </Button>
                        <Button
                          variant={selectedTime === "otro" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime("otro")}
                          className="flex items-center gap-1"
                        >
                          <Calendar className="w-4 h-4" />
                          Otro día
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">¿Dónde pasó?</Label>
                      <Input placeholder="Nombre de la comunidad o lugar" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-2 block">Cuenta lo que pasó</Label>
                    <Textarea placeholder="Describe brevemente lo ocurrido..." rows={4} className="mb-2" />
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Grabar Audio
                    </Button>
                  </div>
                </div>

                {/* Sobre el agresor */}
                <div>
                  <h3 className="font-medium mb-4">
                    Sobre el agresor <span className="text-gray-500 text-sm">(si deseas decirlo)</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Nombre del apodo</Label>
                      <Input placeholder="" />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1 block">DNI (si lo sabes)</Label>
                      <Input placeholder="" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-3 block">¿Es la primera vez que hace esto?</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={selectedFirstTime === "si" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFirstTime("si")}
                        className="flex items-center gap-1"
                      >
                        👍 Sí
                      </Button>
                      <Button
                        variant={selectedFirstTime === "no" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFirstTime("no")}
                        className="flex items-center gap-1"
                      >
                        👎 No
                      </Button>
                      <Button
                        variant={selectedFirstTime === "nariz" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFirstTime("nariz")}
                        className="flex items-center gap-1"
                      >
                        🤷 Nariz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Derecho */}
        <div className="lg:col-span-1 space-y-6">
          {/* Evidencias */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">
                ¿Tienes pruebas? <span className="text-gray-500 text-sm">(Opcional)</span>
              </h3>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">Tipo de prueba</Label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-16">
                    <Camera className="w-5 h-5" />
                    <span className="text-xs">Foto</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-16">
                    <Video className="w-5 h-5" />
                    <span className="text-xs">Video</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-16">
                    <FileText className="w-5 h-5" />
                    <span className="text-xs">Documento</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-16">
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="text-xs">Otro</span>
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">Adjuntar Archivo(s)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Elegir archivos</p>
                    <p className="text-xs text-gray-400">Sin archivos seleccionados</p>
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Otras denuncias */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 text-gray-600">Mira otras denuncias</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">View</span>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    5.3%
                  </Badge>
                </div>
                <div className="h-20 flex items-end justify-between">
                  {[2, 3, 4, 5, 6, 7].map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div className="w-2 bg-teal-400 rounded-t" style={{ height: `${20 + index * 8}px` }}></div>
                      <span className="text-xs text-gray-500 mt-1">{day}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-500">Day</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botón Enviar */}
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-medium rounded-xl">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
