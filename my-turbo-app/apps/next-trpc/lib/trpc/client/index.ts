import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@/backend/server";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>();
