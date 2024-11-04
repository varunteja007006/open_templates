"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login/login-form";
import SignUpForm from "./sign-in/sign-up-form";

export default function Main() {
  const [value, setValue] = React.useState("login");

  return (
    <div className="w-full flex flex-col items-center h-full justify-center min-h-[80vh]">
      <Tabs value={value} onValueChange={setValue} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="space-y-2 min-h-[500px]">
          <LoginForm />
        </TabsContent>
        <TabsContent value="sign-up" className="space-y-2 min-h-[500px]">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
