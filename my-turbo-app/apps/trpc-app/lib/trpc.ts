import { cache } from "react";

export type { AppRouter } from "@workspace/trpc-backend";

import { trpcSessionContext, appRouter } from "@workspace/trpc-backend";

export const trpc = {
  appRouter,
  trpcSessionContext: cache(trpcSessionContext),
};
