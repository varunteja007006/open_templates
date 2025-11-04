"use client";
import { useTRPC } from "@/lib/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import React from "react";
import { toast } from "sonner";

export default function TRPCDemo() {
	const [name, setName] = React.useState("");

	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const userQuery = useQuery(trpc.userList.queryOptions());
	const userCreator = useMutation(
		trpc.createUser.mutationOptions({
			onSuccess: () => {
				setName("");
				queryClient.invalidateQueries({
					queryKey: trpc.userList.queryKey(),
				});
			},
			onError: (err) => {
				toast.error(err.message);
			},
		})
	);

	return (
		<div>
			<div className="space-y-4">
				{userQuery.data?.map((p, index) => (
					<p
						className="font-semibold border p-2 rounded-3xl text-center"
						key={index}
					>
						{p}
					</p>
				))}
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					userCreator.mutate({ name });
				}}
				className="space-y-6"
			>
				<Input value={name} onChange={(e) => setName(e.target.value)} />
				<Button variant={"outline"} type="submit">
					Create
				</Button>
			</form>
		</div>
	);
}
