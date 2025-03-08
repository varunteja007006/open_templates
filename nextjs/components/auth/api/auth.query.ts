"use client";

import { googleLogin } from "./auth.api";
import { useMutation } from "@tanstack/react-query";

import { TUser } from "@/types/user.types";

export type TLoginResponse = {
  message: string;
  user: TUser;
};

export const useLogin = (onSuccess?: (response: TLoginResponse) => void) => {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (response: TLoginResponse) => {
      // redirect to dashboard
      onSuccess?.(response);
    },
    onError: (e) => {
      // show error message
      console.error("Error", e.message);
    },
  });
};
