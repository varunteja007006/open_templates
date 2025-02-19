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

import { SignUpFormSchema } from "@/features/auth/schema/auth.schema";
import { SignUpFormSchemaType } from "../../types/auth.types";
import Required from "@/components/common/Required";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MyTooltip from "@/components/ui/custom/MyTooltip";
import { signup } from "@/features/auth/actions/actions";
import _ from "lodash";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [stage, setStage] = React.useState(1);

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  async function onSubmit(data: SignUpFormSchemaType) {
    const res = await signup(data);
    if (res === true) {
      toast({
        variant: "success",
        description: "Sign up Successful",
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
      <div className="text-lg font-semibold mb-3">Sign up</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {stage === 1 && (
            <>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name
                      <Required>*</Required>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex items-center justify-end">
                <MyTooltip text={"Next"}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStage(2)}
                    size={"icon"}
                  >
                    <ChevronRight />
                  </Button>
                </MyTooltip>
              </div>
            </>
          )}

          {stage === 2 && (
            <>
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
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password
                      <Required>*</Required>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 items-center">
                <div className="w-full flex items-center justify-between">
                  <MyTooltip text={"Back"}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStage(1)}
                      size={"icon"}
                    >
                      <ChevronLeft />
                    </Button>
                  </MyTooltip>
                  <Button type="submit" variant="success">
                    Sign up
                  </Button>
                </div>
                {!_.isEmpty(form.formState.errors) && (
                  <FormMessage>Please correct your form</FormMessage>
                )}
              </div>
            </>
          )}
        </form>
      </Form>
    </Card>
  );
}
