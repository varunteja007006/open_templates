"use client";
import React from "react";
import { useLogin, TLoginResponse } from "@/components/auth/api/auth.query";
import { useAuthContext } from "@/components/auth/context/auth.context";
import { useRouter } from "next/navigation";

export default function LoginOAuth({ provider }: { provider?: string }) {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuthContext();
  const loginDone = React.useRef<boolean>(false);

  // Get the URL hash
  const urlHash = window.location.hash;

  // Remove the '#' from the hash to get the query parameters
  const params = new URLSearchParams(urlHash.substring(1));

  // Access individual parameters
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type");
  const expiresIn = params.get("expires_in");
  const scope = params.get("scope");
  const authUser = params.get("authuser");
  const prompt = params.get("prompt");
  const error = params.get("error");

  console.log("Access Token:", accessToken);
  console.log("Token Type:", tokenType);
  console.log("Expires In:", expiresIn);
  console.log("Scope:", scope);
  console.log("Auth User:", authUser);
  console.log("Prompt:", prompt);
  console.log("Error:", error);

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

// http://localhost:3000/login/login-via-google#access_token=ya29.a0AeXRPp6zS7X_lMn4bRYsITc8R4Q_sDkX2bh1-zy56sRXc6mUE-NnTgVgHiczZThmbtCG3nij7rl57UatRWZgwICgNFsJ6yY2bEQTckJmJYaUerSZhyjqKiZll1cEO1TDa5RkCtz5G82xvVILTxfC5uNl6z7G0Z_PIwSpTjh-aCgYKAbMSARESFQHGX2MirEuK1ZLn8zXhZ9ib7c55Lw0175&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/drive.metadata.readonly&authuser=0&prompt=consent
