"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactQueryTRPCProvider } from "@/lib/trpc/client/provider";
import { Toaster } from "@workspace/ui/components/sonner";

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<ReactQueryTRPCProvider>{children}</ReactQueryTRPCProvider>
			<Toaster />
		</NextThemesProvider>
	);
}
