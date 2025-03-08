"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import AuthAPI from "./auth.api";
import { TUser } from "@/types/user.types";

export type TLoginResponse = {
  message: string;
  user: TUser;
};

export const useLogin = (onSuccess?: (response: TLoginResponse) => void) => {
  return useMutation({
    mutationFn: AuthAPI.googleLogin,
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

export const useValidateToken = () => {
  return useQuery({
    queryKey: ["validate-token"],
    queryFn: AuthAPI.validateToken,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};
