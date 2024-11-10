import * as React from "react";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "react-query";
import { loginWithGoogle, logoutUser } from "@/features/auth/api/login.api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { User } from "@/types/user.types";
import { validateTokenQuery } from "../api/login.query";
import { LOGIN_ROUTES, UNPROTECTED_ROUTES } from "@/constants/routes.constant";
import { socialTokenLogin } from "@/features/auth/actions/actions";

type UserState = User;

type authContextType = {
  userData: UserState | null;
  logout: UseMutationResult<unknown, Error, void, unknown>;
  reset: () => void;
  onClickGoogleLogin: (state?: string) => void;
  googleLogin: (token: string) => Promise<void>;
};

export type TypeGoogleLoginClientID = {
  google_client_id: string;
  django_google_client_id: string;
};

const authContext = React.createContext<authContextType | null>(null);

export function AuthContextProvider({
  children,
  GoogleLogin,
}: Readonly<{
  children: React.ReactNode;
  GoogleLogin: TypeGoogleLoginClientID;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const [userData, setUserData] = React.useState<UserState | null>(null);

  const validateToken = validateTokenQuery(true);

  const reset = React.useCallback(() => {
    // clear storage if needed
    // localStorage.clear();
    sessionStorage.clear();

    // reset the user state
    setUserData(null);

    // redirect to login
    router.push("/login");
  }, []);

  function onError(error: AxiosError) {
    if (error.response?.headers["content-type"] === "application/json") {
      toast({
        variant: "destructive",
        description:
          JSON.stringify(error.response?.data) || "Something went wrong",
      });
    }
    console.error(error);
  }

  function onLogoutSuccess(response: { success: boolean }) {
    // If response failed
    if (response.success) {
      // if response success
      toast({
        description: "Logout Successful",
        variant: "success",
      });
      return;
    }
    toast({
      title: "Logout Failed",
      description: `Oops something went wrong!`,
      variant: "destructive",
    });
  }

  function onLogoutSettled() {
    reset();
  }

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: onLogoutSuccess,
    onError,
    onSettled: onLogoutSettled,
  });

  const googleLogin = async (token: string) => {
    const res = await socialTokenLogin({
      token: token,
      client_id: GoogleLogin.django_google_client_id,
    });

    if (res === true) {
      toast({
        variant: "success",
        description: "Login Successful",
      });
      router.push("/");
      validateToken.refetch();
    } else {
      toast({
        variant: "destructive",
        description: res,
      });
      router.push("/login");
    }
  };

  const onClickGoogleLogin = (state?: string) =>
    loginWithGoogle({ state, client_id: GoogleLogin.google_client_id });

  React.useEffect(() => {
    if (validateToken.isError || validateToken.isLoading) {
      return;
    }
    if (validateToken.data) {
      setUserData((prev) => ({
        ...prev,
        ...validateToken.data,
      }));
    }
  }, [validateToken.data, validateToken.isError, validateToken.isLoading]);

  React.useEffect(() => {
    if (pathname) {
      if (userData?.isAuthenticated) {
        if (LOGIN_ROUTES.includes(pathname)) {
          router.push("/");
        } else {
          router.push(pathname);
        }
      }
      if (
        !UNPROTECTED_ROUTES.includes(pathname) &&
        !userData?.isAuthenticated
      ) {
        router.push("/login");
      }
    }
  }, [pathname, userData]);

  const authObj = React.useMemo(
    () => ({
      reset,
      userData,
      logout,
      googleLogin,
      onClickGoogleLogin,
    }),
    [userData, logout]
  );

  return (
    <authContext.Provider value={authObj}>{children}</authContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
}
