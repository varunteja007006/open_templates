import React from "react";

import GoogleLogin from "@/features/auth/components/login/GoogleLogin";



export default function LoginViaGoogle() {
  const client_id = process.env.DJANGO_GOOGLE_AUTH_ID ?? "";
  return <GoogleLogin client_id={client_id} />;
}
