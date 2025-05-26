"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useCallAnyContract } from "@chipi-pay/chipi-sdk";
import {
  Sun,
  Moon,
  Calendar,
  Mic,
  Camera,
  Video,
  FileText,
  MoreHorizontal,
  Upload,
  X,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import Confetti from "react-confetti";

const CONTRACT_ADDRESS =
  "0x0743389379ec44eb23891ac69ca4dbf728b85803310b57df12524298759060c4";

export default function DenunciaForm() {
  // Estados existentes
  const [selectedTime, setSelectedTime] = useState("hoy");
  const [selectedFirstTime, setSelectedFirstTime] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pin, setPin] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState("");

  // Nuevos estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreAgresor, setNombreAgresor] = useState("");
  const [dniAgresor, setDniAgresor] = useState("");
  const [tipoEvidencia, setTipoEvidencia] = useState("");
  const [loading, setLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  const chipiContract = useCallAnyContract();
  const { getToken } = useAuth();
  // Debugging
  console.log("Full Chipi Contract object:", chipiContract);

  const wallet =
    user?.publicMetadata?.publicKey && user?.publicMetadata?.encryptedPrivateKey
      ? {
          publicKey: user.publicMetadata.publicKey,
          encryptedPrivateKey: user.publicMetadata.encryptedPrivateKey,
        }
      : null;

  // Función para generar el hash SHA-256
  const generateSHA256Hash = async (data: string): Promise<string> => {
    // Convertir la cadena a un arreglo de bytes
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // Generar el hash usando Web Crypto API
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);

    // Convertir el buffer a una cadena hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Recopilar todos los datos del formulario

    const token = await getToken({ template: "SIKUARNFT" });

    if (!wallet || !pin) {
      alert("Por favor, asegúrate de estar conectado y de ingresar tu PIN.");
      return;
    }

    if (!wallet.publicKey) {
      alert("No se pudo obtener la clave pública del wallet.");
      return;
    }

    setLoading(true);

    try {
      const formData = {
        nombre,
        contacto,
        fecha: selectedTime,
        lugar,
        descripcion,
        nombreAgresor,
        dniAgresor,
        primeraVez: selectedFirstTime,
        tipoEvidencia,
        archivos: selectedFiles.map((file) => file.name),
        timestampEnvio: new Date().toISOString(),
      };
      // Convertir a JSON para el hashing
      const formDataString = JSON.stringify(formData);
      console.log("Datos del formulario:", formData);
      // Generar el hash
      const hash = await generateSHA256Hash(formDataString);
      const formatedHash = BigInt(`0x${hash.toLowerCase()}`);
      console.log("Hash SHA-256 de los datos:", formatedHash.toString());
      const callData = [
        wallet.publicKey, // La clave pública del wallet como 'to'
        formatedHash.toString(), // El hash de los datos
      ];

      // Aquí se podría enviar el hash a la blockchain o realizar otras acciones

      const callFn = chipiContract.callAnyContractAsync;

      if (!callFn) {
        throw new Error(
          "The callAnyContractAsync method is not available in this SDK version."
        );
      }

      const payload = {
        encryptKey: pin,
        bearerToken: token,
        wallet: {
          publicKey: wallet.publicKey,
          encryptedPrivateKey: wallet.encryptedPrivateKey,
        },
        calls: [
          {
            contractAddress: CONTRACT_ADDRESS,
            entrypoint: "mint",
            calldata: callData,
          },
        ],
      };

      // Ejecutar la transacción
      const result = await callFn(payload);
      console.log("Resultado de la transacción:", result);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Show for 5 seco
    } catch (err) {
      console.error("Error sending wave:", err);

      // More detailed error parsing
      if (err instanceof Error) {
        console.error("Error details:", err.message);
        console.error("Error stack:", err.stack);

        // Enhanced debugging for paymaster issues
        if (
          err.message.includes("argent/multicall-failed") ||
          err.message.includes("u256_sub Overflow")
        ) {
          console.error(
            "This appears to be a paymaster configuration issue. The transaction is failing at the contract level."
          );
          console.error(err.message);
          return;
        }

        // Try to extract more details if this is an API error
        try {
          if (err.message.includes('{"statusCode":500')) {
            console.error(
              "This appears to be a server error on Chipi's backend. It might be temporary or require SDK configuration changes."
            );
            // Extract more details if possible
            const errorMatch = err.message.match(/\{.*\}/);
            if (errorMatch) {
              const errorJson = JSON.parse(errorMatch[0]);
              console.error("Detailed API error:", errorJson);
            }
          }
        } catch (parseErr) {
          console.error("Could not parse error details:", parseErr);
        }
      }

      //alert("Error sending wave: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {/* Header simplificado */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            SIKUAR - Sistema de Denuncias
          </h1>
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
                  <h2 className="text-xl font-semibold mb-4">
                    Sobre lo que pasó
                  </h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">
                      Tus datos{" "}
                      <span className="text-gray-500 text-sm">
                        (opcional, para recibir ayuda)
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Esta información es secreta.
                    </p>

                    <div className="space-y-3">
                      <Input
                        placeholder="Tu nombre (opcional)"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      <Input
                        placeholder="¿Cómo podemos contactarte? (Teléfono, etc.) (opcional)"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Resto del formulario permanece igual */}
                {/* Sobre lo que pasó - Detalles */}
                <div>
                  <h3 className="font-medium mb-4">Sobre lo que pasó</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        ¿Cuándo pasó?
                      </Label>
                      <div className="flex gap-2">
                        <Button
                          variant={
                            selectedTime === "hoy" ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedTime("hoy")}
                          className="flex items-center gap-1"
                        >
                          <Sun className="w-4 h-4" />
                          Hoy
                        </Button>
                        <Button
                          variant={
                            selectedTime === "ayer" ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedTime("ayer")}
                          className="flex items-center gap-1"
                        >
                          <Moon className="w-4 h-4" />
                          Ayer
                        </Button>
                        <Button
                          variant={
                            selectedTime === "otro" ? "default" : "outline"
                          }
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
                      <Label className="text-sm font-medium mb-2 block">
                        ¿Dónde pasó?
                      </Label>
                      <Input
                        placeholder="Nombre de la comunidad o lugar"
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-2 block">
                      Cuenta lo que pasó
                    </Label>
                    <Textarea
                      placeholder="Describe brevemente lo ocurrido..."
                      rows={4}
                      className="mb-2"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4" />
                      Grabar Audio
                    </Button>
                  </div>
                </div>

                {/* Sobre el agresor */}
                <div>
                  <h3 className="font-medium mb-4">
                    Sobre el agresor{" "}
                    <span className="text-gray-500 text-sm">
                      (si deseas decirlo)
                    </span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Nombre del apodo
                      </Label>
                      <Input
                        placeholder=""
                        value={nombreAgresor}
                        onChange={(e) => setNombreAgresor(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        DNI (si lo sabes)
                      </Label>
                      <Input
                        placeholder=""
                        value={dniAgresor}
                        onChange={(e) => setDniAgresor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-3 block">
                      ¿Es la primera vez que hace esto?
                    </Label>
                    <div className="flex gap-3">
                      <Button
                        variant={
                          selectedFirstTime === "si" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFirstTime("si")}
                        className="flex items-center gap-1"
                      >
                        👍 Sí
                      </Button>
                      <Button
                        variant={
                          selectedFirstTime === "no" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFirstTime("no")}
                        className="flex items-center gap-1"
                      >
                        👎 No
                      </Button>
                      <Button
                        variant={
                          selectedFirstTime === "Nose" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFirstTime("Nose")}
                        className="flex items-center gap-1"
                      >
                        🤷 Nose
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Derecho - Sin cambios */}
        <div className="lg:col-span-1 space-y-6">
          {/* Evidencias */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">
                ¿Tienes pruebas?{" "}
                <span className="text-gray-500 text-sm">(Opcional)</span>
              </h3>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">
                  Tipo de prueba
                </Label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button
                    variant={tipoEvidencia === "foto" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoEvidencia("foto")}
                    className="flex flex-col items-center gap-1 h-16"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-xs">Foto</span>
                  </Button>
                  <Button
                    variant={tipoEvidencia === "video" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoEvidencia("video")}
                    className="flex flex-col items-center gap-1 h-16"
                  >
                    <Video className="w-5 h-5" />
                    <span className="text-xs">Video</span>
                  </Button>
                  <Button
                    variant={
                      tipoEvidencia === "documento" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setTipoEvidencia("documento")}
                    className="flex flex-col items-center gap-1 h-16"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-xs">Documento</span>
                  </Button>
                  <Button
                    variant={tipoEvidencia === "otro" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoEvidencia("otro")}
                    className="flex flex-col items-center gap-1 h-16"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="text-xs">Otro</span>
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">
                  Adjuntar Archivo(s)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Elegir archivos</p>
                    <p className="text-xs text-gray-400">
                      {selectedFiles.length === 0
                        ? "Sin archivos seleccionados"
                        : `${selectedFiles.length} archivo(s) seleccionado(s)`}
                    </p>
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
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
              <h3 className="font-medium mb-4 text-gray-600">
                Mira otras denuncias
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">View</span>
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-800"
                  >
                    5.3%
                  </Badge>
                </div>
                <div className="h-20 flex items-end justify-between">
                  {[2, 3, 4, 5, 6, 7].map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className="w-2 bg-teal-400 rounded-t"
                        style={{ height: `${20 + index * 8}px` }}
                      ></div>
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

          {/* PIN */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Ingresa tu PIN</h3>
              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">
                  PIN de 4 dígitos para firmar la denuncia
                </Label>
                <Input
                  type="password"
                  placeholder="Ingresa tu PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este PIN es necesario para firmar y enviar tu denuncia de
                  forma segura
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botón Enviar */}
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-medium rounded-xl"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
