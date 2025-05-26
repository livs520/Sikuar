"use client";

import * as React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCreateWallet } from "@chipi-pay/chipi-sdk";
import { completeOnboarding } from "./_actions";

export default function OnboardingComponent() {
  // Access the current user's data
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();
  const { createWalletAsync, isLoading, isError } = useCreateWallet();

  // This function handles the form submission
  // In a complete implementation, this would:
  // 1. Collect user data from the form
  // 2. Call the completeOnboarding server action to update user's publicMetadata
  // 3. Set onboardingComplete: true in the user's publicMetadata
  // 4. Reload the user data to refresh session claims
  // 5. Redirect to the main application page
  const handleSubmit = async (formData: FormData) => {
    const token = await getToken({ template: "SIKUARNFT" });

    try {
      const pin = formData.get("pin") as string;

      if (!pin || pin.trim() === "") {
        throw new Error("PIN is required");
      }

      if (!/^\d+$/.test(pin)) {
        throw new Error("PIN must contain only numbers");
      }

      console.log("Creating wallet...");

      const response = await createWalletAsync({
        encryptKey: pin,
        bearerToken: token,
      });
      console.log("Wallet creation response:", response);

      if (!response.success || !response.wallet) {
        throw new Error("Failed to create wallet");
      }

      console.log("Updating Clerk metadata...");
      const result = await completeOnboarding({
        publicKey: response.wallet.publicKey,
        encryptedPrivateKey: response.wallet.encryptedPrivateKey,
      });
      console.log("Clerk update result:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      await user?.reload();
      router.push("/");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // You might want to show this error to the user
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-cyan-400/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white border border-cyan-300/20 flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-6">
            🌊 Creando tu Wallet
          </h2>

          <div className="relative w-32 h-32 mb-8">
            {/* Círculos animados */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-cyan-300 border-b-teal-400 border-l-blue-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-t-blue-400 border-r-teal-400 border-b-cyan-300 border-l-cyan-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 rounded-full bg-cyan-400/20 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">💼</span>
            </motion.div>
          </div>

          <p className="text-cyan-100 text-center mb-2">
            Estamos configurando tu wallet segura
          </p>
          <motion.p
            className="text-cyan-200/70 text-sm text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Este proceso puede tomar unos segundos...
          </motion.p>
        </motion.div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-red-400/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white border border-red-300/30 flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-5xl"
          >
            ⚠️
          </motion.div>

          <h2 className="text-2xl font-bold text-red-300 mb-3">
            Error al crear tu Wallet
          </h2>

          <p className="text-white/80 text-center mb-6">
            Lo sentimos, ha ocurrido un problema durante la creación de tu
            wallet. Esto puede deberse a problemas de conexión o del servidor.
          </p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 transition-colors rounded-lg border border-red-400/30"
            >
              Reintentar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-lg border border-cyan-400/20"
            >
              Volver al inicio
            </motion.button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-cyan-400/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white border border-cyan-300/20"
      >
        <h1 className="text-3xl font-extrabold mb-4 text-cyan-300">
          🌊 Onboarding
        </h1>

        <form action={handleSubmit}>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-cyan-100">
                Enter your PIN
              </label>
              <p className="text-xs text-cyan-200/70">
                This PIN will be used to create your wallet and encrypt your
                private key.
              </p>
              <input
                type="password"
                name="pin"
                inputMode="numeric"
                pattern="[0-9]{4}"
                minLength={4}
                maxLength={4}
                required
                className="mt-2 w-full px-3 py-2 bg-cyan-200/10 border border-cyan-200/20 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-300 focus:border-cyan-300 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-cyan-400/20 hover:bg-cyan-400/30 transition text-white rounded-lg font-medium"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </motion.div>
    </main>
  );
}
