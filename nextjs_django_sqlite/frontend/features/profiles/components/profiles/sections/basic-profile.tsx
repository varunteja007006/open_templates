"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthContext } from "@/features/auth/context/auth.context";

export default function BasicProfile() {
  const { userData, logout } = useAuthContext();

  return (
    <Card className="w-full">
      <CardHeader className="flex-col md:flex-row justify-between items-start">
        <div>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>This is your profile information</CardDescription>
        </div>
        <div className="hidden md:flex">
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => logout.mutate()}
          >
            Logout
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
          <p>Full Name:</p>
          <p>{userData?.full_name ?? ""}</p>
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
          <p>Email:</p>
          <p>{userData?.email ?? ""}</p>
        </div>
      </CardContent>
    </Card>
  );
}
