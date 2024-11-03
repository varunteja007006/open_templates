import * as React from "react";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "react-query";
import {
  loginUser,
  loginUserV2,
  logoutUser,
  signup,
  socialTokenLogin,
} from "@/features/auth/api/login.api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { User } from "@/types/user.types";
import { validateTokenQuery } from "../api/login.query";
import {
  LoginFormSchemaType,
  SignUpFormSchemaType,
  socialLoginPayloadType,
} from "../types/auth.types";
import { LOGIN_ROUTES, UNPROTECTED_ROUTES } from "@/constants/routes.constant";
import { ToastErrorObj } from "@/types/api.types";

type UserState = User;

type LoginMutation = UseMutationResult<
  { success: boolean },
  AxiosError,
  LoginFormSchemaType
>;

type authContextType = {
  userData: UserState | null;
  setUserData: React.Dispatch<React.SetStateAction<UserState | null>>;
  reset: () => void;
  logout: UseMutationResult<unknown, Error, void, unknown>;
  login: LoginMutation;
  loginV2: LoginMutation;
  signUp: UseMutationResult<
    { success: boolean },
    AxiosError,
    SignUpFormSchemaType
  >;
  socialLogin: UseMutationResult<
    { success: boolean },
    AxiosError,
    socialLoginPayloadType
  >;
};

const authContext = React.createContext<authContextType | null>(null);

export function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const [userData, setUserData] = React.useState<UserState | null>(null);

  const reset = React.useCallback(() => {
    // clear storage
    // localStorage.clear();
    // sessionStorage.clear();

    // reset the user state
    setUserData(null);
    // redirect to login
    router.push("/login");
  }, []);

  const validateToken = validateTokenQuery(true);

  function onSuccess(response: { success: boolean } | undefined) {
    // If response failed
    if (!response) {
      toast({
        title: "Login Failed",
        description: `Oops something went wrong!`,
        variant: "destructive",
      });
      return;
    }

    if (response.success) {
      toast({
        title: "Login Successful",
        variant: "success",
      });
      validateToken.refetch();
    }
  }

  function onError(error: AxiosError) {
    toast(error.response?.data as ToastErrorObj);
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

  const login = useMutation<
    { success: boolean },
    AxiosError,
    LoginFormSchemaType
  >({
    mutationFn: loginUser,
    onSuccess,
    onError,
  });

  const loginV2 = useMutation<
    { success: boolean },
    AxiosError,
    LoginFormSchemaType
  >({
    mutationFn: loginUserV2,
    onSuccess,
    onError,
  });

  const signUp = useMutation<
    { success: boolean },
    AxiosError,
    SignUpFormSchemaType
  >({
    mutationFn: signup,
    onSuccess,
    onError,
  });

  const socialLogin = useMutation<
    { success: boolean },
    AxiosError,
    socialLoginPayloadType
  >({
    mutationFn: socialTokenLogin,
    onSuccess,
    onError: (error) => {
      onError(error);
      router.push("/login");
    },
  });

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
      setUserData,
      userData,
      logout,
      login,
      loginV2,
      socialLogin,
      signUp,
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
