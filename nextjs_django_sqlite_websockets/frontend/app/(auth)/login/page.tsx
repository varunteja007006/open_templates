import React from "react";

import Main from "@/features/auth/components/Main";

export default function LoginPage() {
  const client_id = process.env.GOOGLE_CLIENT_ID ?? "";

  return <Main client_id={client_id} />;
}
