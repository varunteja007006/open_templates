import React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import SignOutBtn from "@/components/organisms/sign-out-btn";
import { SignUpForm } from "@/components/organisms/sign-up-form";
import { SignInForm } from "@/components/organisms/sign-in-form";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GoogleLoginBtn } from "@/components/organisms/google-login-btn";

const LoginFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6 p-2">
      {children}
      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        <GoogleLoginBtn />
      </div>
    </div>
  );
};

export const SignUp = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <Tabs defaultValue="sign-up" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <LoginFormWrapper>
            <SignUpForm />
          </LoginFormWrapper>
        </TabsContent>
        <TabsContent value="sign-in">
          <LoginFormWrapper>
            <SignInForm />
          </LoginFormWrapper>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div
      className="bg-card rounded-lg shadow border flex flex-col items-center justify-center
    gap-4 p-4"
    >
      <h1>Welcome {session.user.name}</h1>
      <SignOutBtn />
    </div>
  );
};
