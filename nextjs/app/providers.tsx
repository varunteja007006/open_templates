"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/components/auth/context/auth.context";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthContextProvider>{children}</AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
