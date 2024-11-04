import React from "react";

import { Button } from "@/components/ui/button";

import { FaGoogle } from "react-icons/fa6";
import MyTooltip from "@/components/ui/custom/MyTooltip";

import { useAuthContext } from "../../context/auth.context";

export default function OtherLogins() {
  const { onClickGoogleLogin } = useAuthContext();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // Extract state from somewhere, or pass it directly
    onClickGoogleLogin();
  };

  return (
    <div className="p-2 md:pl-3 md:pr-0 h-full border-l dark:border-none">
      <MyTooltip text={"Sign in with Google"}>
        <Button
          type="button"
          onClick={onClick}
          variant={"outline"}
          size={"icon"}
        >
          <FaGoogle />
        </Button>
      </MyTooltip>
    </div>
  );
}
