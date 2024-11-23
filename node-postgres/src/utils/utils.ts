import { ZodError } from "zod";

export function zodReadableError(err: ZodError) {
  return err.errors.map((error) => {
    return {
      field: error.path.join("."),
      message: error.message,
      code: error.code,
      expected:
        error.code === "invalid_type" ? (error as any).expected : undefined,
    };
  });
}
