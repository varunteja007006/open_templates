"use server";
import axios from "@/lib/axios";
import { SignUpFormSchemaType } from "../types/auth.types";
import { cookies } from "next/headers";

export const signup = async (data: SignUpFormSchemaType) => {
  const cookie = cookies();

  try {
    const response = await axios.post<{ success: boolean; token: "string" }>(
      "/api/v1/auth/sign-up",
      data
    );

    if (response.data.success) {
      cookie.set("token", response.data.token);
    }

    return response.data.success;
  } catch (error: any) {
    return error.response?.data;
  }
};
