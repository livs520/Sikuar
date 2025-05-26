import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import StarknetProviderWrapper from "./StarknetProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIKUAR - Sistema de Denuncias",
  description: "SIKUAR - Sistema de denuncias identificadas",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <header className="flex justify-end items-center bg-teal-600 p-4 gap-4 h-16 shadow-md">
              <div className="flex-1">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span className="text-lg font-semibold text-white">
                SIKUAR
                </span>
                <span className="text-sm text-white/80 hidden sm:inline">
                Sistema de Denuncias Identificadas
                </span>
              </a>
              </div>
              <SignedOut>
              <div className="space-x-2">
                <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-md bg-white text-green-600 font-medium hover:bg-white/90 transition-colors">
                  Iniciar Sesión
                </button>
                </SignInButton>
                <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-md bg-green-700 text-white font-medium hover:bg-green-800 transition-colors border border-white/20">
                  Registrarse
                </button>
                </SignUpButton>
              </div>
              </SignedOut>
              <SignedIn>
              <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            <StarknetProviderWrapper>{children}</StarknetProviderWrapper>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
