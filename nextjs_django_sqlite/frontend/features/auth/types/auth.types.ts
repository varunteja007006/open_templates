import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "../schema/auth.schema";

export type validateTokenType = {
  email: string;
  full_name: string;
  isAuthenticated: boolean;
};

export type socialLoginDataType = {
  grant_type: "convert_token";
  client_id: string;
  backend: "google-oauth2";
  token: string;
};

export type socialLoginPayloadType = {
  client_id: string;
  token: string;
};

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
