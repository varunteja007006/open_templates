"use client";
import React from "react";

import { useAuthContext } from "@/features/auth/context/auth.context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function GoogleLogin() {
  const { socialLogin } = useAuthContext();

  const alreadyCalled = React.useRef(false);

  const { toast } = useToast();

  const router = useRouter();

  // Get the fragment (hash) part of the URL after "#"
  const hashParams = new URLSearchParams(
    (typeof window !== "undefined" && window.location.hash.substring(1)) || ""
  );

  const access_token = hashParams.get("access_token");
  const error = hashParams.get("error");

  const handleLogin = async (token: string) => {
    socialLogin.mutate({ token: token, client_id: "" });
  };

  React.useEffect(() => {
    if (access_token && !alreadyCalled.current) {
      alreadyCalled.current = true;
      handleLogin(access_token);
    }
  }, [access_token]);

  React.useEffect(() => {
    if (error === "access_denied") {
      toast({
        title: "Login Failed",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [error]);

  return <div>GoogleLogin</div>;
}
