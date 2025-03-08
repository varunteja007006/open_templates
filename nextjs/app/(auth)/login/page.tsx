import React from "react";
import GoogleLogin from "@/components/auth/components/google-login-btn";

export default function Page() {
  const google_client_id = process.env.GOOGLE_CLIENT_ID ?? "";

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <GoogleLogin client_id={google_client_id} state={""} />
    </div>
  );
}
