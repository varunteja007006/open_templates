import React from "react";

import { ModeToggle } from "@/components/theme-toggle";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UserNavbar() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-row items-center">
        <Button variant={"default"} asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
      <ModeToggle />
    </div>
  );
}
