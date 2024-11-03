import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .email()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(250, {
      message: "Username too long. Maximum 250 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password too long. Maximum 30 characters.",
    }),
  rememberLogin: z.boolean().default(false),
});

export const SignUpFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(250, {
        message: "First name too long. Maximum 250 characters.",
      }),
    last_name: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(250, {
        message: "Last name too long. Maximum 250 characters.",
      })
      .or(z.literal(undefined)),
    username: z
      .string()
      .email()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(250, {
        message: "Username too long. Maximum 250 characters.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password too long. Maximum 30 characters.",
      }),
    confirm_password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password too long. Maximum 30 characters.",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["password"],
  });
