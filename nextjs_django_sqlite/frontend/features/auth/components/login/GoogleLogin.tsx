"use client";
import React from "react";

import { useAuthContext } from "@/features/auth/context/auth.context";

export default function GoogleLogin({
  client_id,
}: Readonly<{ client_id: string }>) {
  const { socialLogin } = useAuthContext();

  // Get the fragment (hash) part of the URL after "#"
  const hashParams = new URLSearchParams(
    (typeof window !== "undefined" && window.location.hash.substring(1)) || ""
  );

  const access_token = hashParams.get("access_token");

  const handleLogin = async (token: string) => {
    socialLogin.mutate({
      client_id,
      token,
    });
  };

  React.useEffect(() => {
    if (access_token) {
      handleLogin(access_token);
    }
  }, [access_token]);

  return <div>GoogleLogin</div>;
}
