import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpc } from "@/lib/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpc.appRouter,
    createContext: trpc.trpcSessionContext,
  });

export { handler as GET, handler as POST };
