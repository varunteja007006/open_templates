"use client";
import React from "react";
import { useLogin, TLoginResponse } from "@/components/auth/api/auth.query";
import { useAuthContext } from "@/components/auth/context/auth.context";

export default function LoginOAuth({ provider }: { provider?: string }) {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const loginDone = React.useRef<boolean>(false);

  // Get the URL hash
  const urlHash = window.location.hash;

  // Remove the '#' from the hash to get the query parameters
  const params = new URLSearchParams(urlHash.substring(1));

  // Access individual parameters
  const accessToken = params.get("access_token");
  const error = params.get("error");

  const onSuccess = (response: TLoginResponse) => {
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const login = useLogin(onSuccess);

  React.useEffect(() => {
    if (accessToken && !loginDone.current) {
      // make a call to db to store the token
      login.mutate({ token: accessToken });
      loginDone.current = true;
    }
  }, [accessToken]);

  if (error === "access_denied") {
    return <div>Access Denied</div>;
  }

  return <div>OAuth</div>;
}
