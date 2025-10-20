import { cache } from "react";

export type { AppRouter } from "@workspace/starter-trpc-backend";

import { trpcSessionContext, appRouter } from "@workspace/starter-trpc-backend";

export const trpc = {
  appRouter,
  trpcSessionContext: cache(trpcSessionContext),
};
