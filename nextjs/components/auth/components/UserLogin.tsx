import React from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { useAuthContext } from "../context/auth.context";

export default function UserLogin() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex gap-5 items-center">
      <div className="flex flex-row items-center">
        {isAuthenticated ? (
          <UserHoverCard />
        ) : (
          <Button variant={"default"} asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

const UserHoverCard = () => {
  const { user } = useAuthContext();
  return (
    <Button variant={"link"} className="cursor-pointer">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{user?.first_name?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      {user?.first_name}
    </Button>
  );
};
