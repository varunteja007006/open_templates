"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import { FaGoogle } from "react-icons/fa6";
import MyTooltip from "@/components/ui/custom/MyTooltip";
import { oAuthLogin } from "@/components/auth/utils/oauth";

export default function GoogleLogin({
  client_id,
  state,
}: {
  client_id: string;
  state?: string;
}) {
  return (
    <div className="p-2 md:pl-3 md:pr-0 h-full border-l dark:border-none">
      <MyTooltip text={"Sign in with Google"}>
        <Button
          type="button"
          onClick={() => oAuthLogin("google", client_id, state)}
          variant={"outline"}
          size={"icon"}
        >
          <FaGoogle />
        </Button>
      </MyTooltip>
    </div>
  );
}
