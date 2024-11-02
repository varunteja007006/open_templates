import React from "react";

export default function Required({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <span className="text-red-500 px-1">{children}</span>;
}
