import { postTable } from "./post";
import { user, session, account, verification } from "./auth-schema";

export const dbSchema = {
  postTable,
  user,
  session,
  account,
  verification,
};
