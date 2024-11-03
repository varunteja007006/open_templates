"use client";
import React from "react";

import { useAuthContext } from "@/features/auth/context/auth.context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function GoogleLogin({
  client_id,
}: Readonly<{ client_id: string }>) {
  const { socialLogin } = useAuthContext();

  const { toast } = useToast();

  const router = useRouter();

  // Get the fragment (hash) part of the URL after "#"
  const hashParams = new URLSearchParams(
    (typeof window !== "undefined" && window.location.hash.substring(1)) || ""
  );

  const access_token = hashParams.get("access_token");
  const error = hashParams.get("error");

  const handleLogin = async (token: string) => {
    socialLogin.mutate({
      client_id,
      token,
    });
  };

  React.useEffect(() => {
    if (access_token) {
      handleLogin(access_token);
      router;
    }

    if (error === "access_denied") {
      toast({
        title: "Login Failed",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [access_token, error]);

  return <div>GoogleLogin</div>;
}
