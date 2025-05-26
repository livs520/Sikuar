"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Database,
  FileText,
  ChevronRight,
  CheckCircle,
  Users,
  Layers,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            SIKUAR - Sistema de Denuncias Verificadas
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel Izquierdo - Branding */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-3xl p-8 text-white h-full min-h-[400px] flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              SIKUAR
              <br />
              Confianza
              <br />
              Digital
            </h1>
            <p className="text-2xl font-bold text-black mt-8">
              Datos
              <br />
              Verificados
              <br />
              Blockchain
            </p>
          </div>
        </div>

        {/* Panel Central - Información sobre SIKUAR */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Introducción */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    ¿Qué es SIKUAR?
                  </h2>

                  <p className="text-gray-700 mb-4">
                    SIKUAR es un sistema innovador dedicado a la recolección de
                    denuncias y datos verificables mediante tecnología
                    blockchain, garantizando la integridad y transparencia de la
                    información.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="text-teal-500 w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Seguridad Garantizada
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tus datos están protegidos con cifrado de nivel
                          militar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lock className="text-teal-500 w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Privacidad Absoluta
                        </h3>
                        <p className="text-sm text-gray-600">
                          Control total sobre la información que compartes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tecnología Blockchain */}
                <div>
                  <h3 className="font-medium mb-4">Verificación Blockchain</h3>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">
                      Cada denuncia registrada en SIKUAR es verificada y sellada
                      mediante tecnología blockchain, lo que garantiza que la
                      información no puede ser alterada ni manipulada una vez
                      almacenada.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-teal-100">
                      <Database className="text-teal-500 w-5 h-5 mb-2" />
                      <h4 className="text-sm font-medium">Datos inmutables</h4>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-teal-100">
                      <Layers className="text-teal-500 w-5 h-5 mb-2" />
                      <h4 className="text-sm font-medium">
                        Verificación descentralizada
                      </h4>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-teal-100">
                      <CheckCircle className="text-teal-500 w-5 h-5 mb-2" />
                      <h4 className="text-sm font-medium">Pruebas validadas</h4>
                    </div>
                  </div>
                </div>

                {/* Cómo funciona */}
                <div>
                  <h3 className="font-medium mb-4">Cómo funciona</h3>

                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <div className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <p className="text-gray-700">
                        Completa el formulario de denuncia con la información
                        requerida
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <p className="text-gray-700">
                        Adjunta evidencias relevantes (fotos, documentos, etc.)
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <p className="text-gray-700">
                        Tu información es verificada y registrada en blockchain
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                      <p className="text-gray-700">
                        Recibe un código único de seguimiento para tu caso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Derecho - Estadísticas y Acción */}
        <div className="lg:col-span-1 space-y-6">
          {/* CTA para denunciar */}
          <Card className="shadow-lg border-t-4 border-t-teal-500">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4 text-lg">Realiza tu denuncia</h3>

              <p className="text-gray-600 mb-6">
                Tu testimonio es importante. Completa el formulario para
                registrar tu denuncia de manera segura y verificable.
              </p>

              <Link href="/form" passHref>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg font-medium rounded-xl flex items-center justify-center gap-2">
                  Iniciar Denuncia
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 text-gray-600">
                Impacto de SIKUAR
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <span className="block text-2xl font-bold text-blue-700">
                    245+
                  </span>
                  <span className="text-xs text-gray-600">
                    Denuncias procesadas
                  </span>
                </div>
                <div className="bg-teal-50 rounded-lg p-3 text-center">
                  <span className="block text-2xl font-bold text-teal-700">
                    98%
                  </span>
                  <span className="text-xs text-gray-600">
                    Tasa de verificación
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Denuncias por mes
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-800"
                  >
                    +12.3%
                  </Badge>
                </div>
                <div className="h-20 flex items-end justify-between">
                  {[2, 3, 4, 5, 6, 7].map((month, index) => (
                    <div key={month} className="flex flex-col items-center">
                      <div
                        className="w-6 bg-teal-400 rounded-t"
                        style={{ height: `${20 + index * 8}px` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">
                        {month}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-500">Últimos 6 meses</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonios */}
          <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-teal-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-teal-600" />
                <h3 className="font-medium text-gray-700">
                  Respaldo comunitario
                </h3>
              </div>
              <p className="text-sm text-gray-600 italic">
                "SIKUAR ha permitido que nuestra comunidad pueda documentar
                casos de manera segura, brindando confianza a las víctimas para
                hablar."
              </p>
              <p className="text-xs text-right mt-2 text-gray-500">
                — Coordinadora de Justicia Comunitaria
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
