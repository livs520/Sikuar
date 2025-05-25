"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function IncidentPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel Izquierdo - Denuncia */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2">Denuncia Indentificada</h2>
                <p className="text-purple-100 text-sm">Permite Contactarte para seguimiento</p>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de datos personales */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-gray-800">Sobre la que dices</h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Nombre</Label>
                  <Input placeholder="Ingresa tu nombre" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Apellidos</Label>
                  <Input placeholder="Ingresa tus apellidos" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Teléfono (opcional)</Label>
                  <Input placeholder="Número de teléfono" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Correo electrónico</Label>
                  <Input type="email" placeholder="correo@ejemplo.com" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">¿Dónde ocurrió?</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona una ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="almacen">Almacén</SelectItem>
                      <SelectItem value="fabrica">Fábrica</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-gray-600">¿Cuándo ocurrió?</Label>
                  <Input type="date" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">¿Qué pasó?</Label>
                  <Textarea placeholder="Describe lo que ocurrió..." rows={4} className="mt-1" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    Acepto los términos y condiciones
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Derecho - Información adicional */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-gray-800">Sobre la que dices</h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Nombre del agresor</Label>
                  <Input placeholder="Nombre completo del agresor" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">DNI del agresor</Label>
                  <Input placeholder="Número de DNI" className="mt-1" />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-blue-900 mb-2">Autorización de Compartir Información</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Al enviar esta denuncia, nos autorizas a compartir la información proporcionada con las
                    instituciones correspondientes para ayudar en la investigación y resolución del caso reportado.
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox id="authorization" />
                    <Label htmlFor="authorization" className="text-sm text-blue-800">
                      Autorizo el uso y compartir de esta información
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium" size="lg">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
