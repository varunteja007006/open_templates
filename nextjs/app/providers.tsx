"use client";

import * as React from "react";

import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "react-query";

import {
  AuthContextProvider,
  TypeGoogleLoginClientID,
} from "@/features/auth/context/auth.context";

// Create a client
const queryClient = new QueryClient();

export default function Provider({
  children,
  GoogleLogin,
}: Readonly<{
  children: React.ReactNode;
  GoogleLogin: TypeGoogleLoginClientID;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider GoogleLogin={GoogleLogin}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
