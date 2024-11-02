import { useQuery } from "react-query";
import { validateToken } from "./login.api";

export const validateTokenQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["validate-token"],
    queryFn: validateToken,
    retry: false,
    enabled,
  });
};
