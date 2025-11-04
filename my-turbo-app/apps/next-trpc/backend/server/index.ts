import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const users: string[] = [];
const appRouter = router({
	userList: publicProcedure.query(async () => {
		// Retrieve users from a datasource, this is an imaginary database
		return users;
	}),
	createUser: publicProcedure
		.input(z.object({ name: z.string().max(10, "Too long text") }))
		.mutation(async (opts) => {
			const { input } = opts;

			const user = users.push(input.name);

			return user;
		}),
});

const server = createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext: async (opts) => {
		console.log("context logging: ", opts.req.url);
		return {};
	},
});
console.log("server started at port 4000");
server.listen(4000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
