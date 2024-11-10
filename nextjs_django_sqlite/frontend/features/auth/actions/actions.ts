"use server";
import axios from "@/lib/axios";
import { LoginFormSchemaType, SignUpFormSchemaType } from "../types/auth.types";
import { cookies } from "next/headers";

export const signup = async (data: SignUpFormSchemaType) => {
  const cookie = cookies();

  try {
    const response = await axios.post<{ success: boolean; token: string }>(
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

export const login = async (data: LoginFormSchemaType) => {
  const cookie = cookies();

  try {
    const response = await axios.post<{
      success: boolean;
      token: string;
    }>("/api/v1/auth/login", data);

    if (response.data.success) {
      cookie.set("token", response.data.token);
    }

    return response.data.success;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const loginV2 = async (data: LoginFormSchemaType) => {
  const cookie = cookies();

  try {
    const response = await axios.post<{
      success: boolean;
      access_token: string;
      refresh_token: string;
    }>("/api/v1/auth/login/token/v2", data);

    if (response.data.success) {
      cookie.set("access_token", response.data.access_token);
      cookie.set("refresh_token", response.data.refresh_token);
    }

    return response.data.success;
  } catch (error: any) {
    return error.response?.data;
  }
};
