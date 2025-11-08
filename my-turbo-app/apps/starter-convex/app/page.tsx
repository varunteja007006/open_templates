import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@workspace/ui/components/button";
import { useQuery } from "convex/react";
import { api } from "@workspace/convex-backend/convex/_generated/api";

export default function Page() {
	const tasks = useQuery(api.tasks.get);
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<Button size="sm">Button</Button>
				<ModeToggle />
				<div className="rounded border p-2 space-y-2">
					<p className="font-semibold border-b text-center">Tasks</p>
					<div className="flex flex-col items-center justify-center gap-2">
						{tasks?.map(({ _id, text }) => (
							<div key={_id}>{text}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
