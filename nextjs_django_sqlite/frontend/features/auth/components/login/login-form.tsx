"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { LoginFormSchema } from "@/features/auth/schema/auth.schema";
import OtherLogins from "@/features/auth/components/login/other-logins";
import { LoginFormSchemaType } from "../../types/auth.types";
import Required from "@/components/common/Required";
import { login, loginV2 } from "@/features/auth/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(data: LoginFormSchemaType) {
    let res;
    if (form.getValues("rememberLogin")) {
      res = await loginV2(data);
    } else {
      res = await login(data);
    }
    if (res === true) {
      toast({
        variant: "success",
        description: "Login Successful",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        description: res,
      });
    }
  }

  return (
    <Card className="w-full p-5">
      <div className="flex flex-col md:flex-row gap-1 items-stretch justify-around">
        <div className="flex-1 pr-3">
          <div className="text-lg font-semibold mb-3">Login</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      <Required>*</Required>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                      <Required>*</Required>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberLogin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember Login</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" variant="success">
                Log in
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <OtherLogins />
        </div>
      </div>
    </Card>
  );
}
