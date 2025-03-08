import React from "react";
import GoogleLogin from "@/components/auth/components/login/google-login-btn";

export default function Page() {
  const client_id = process.env.GOOGLE_CLIENT_ID ?? "";
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <GoogleLogin client_id={client_id} state={""} />
    </div>
  );
}
