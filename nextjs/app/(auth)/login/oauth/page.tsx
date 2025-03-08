import React from "react";

import LoginOAuth from "@/components/auth/components/login-oauth";

export default function Page({
  searchParams,
}: {
  searchParams: { provider: string };
}) {
  return <LoginOAuth provider={searchParams.provider} />;
}
