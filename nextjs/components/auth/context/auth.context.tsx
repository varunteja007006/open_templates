"use client";
import * as React from "react";

import { usePathname, useRouter } from "next/navigation";
import { LOGIN_ROUTES, UNPROTECTED_ROUTES } from "@/constants/routes.constant";
import { TUser } from "@/types/user.types";
import { useValidateToken } from "@/components/auth/api/auth.query";

type authContextType = {
  user: TUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: TUser | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthContext = React.createContext<authContextType | null>(null);

export function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = React.useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const logout = React.useCallback(() => {
    // clear storage if needed
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    // redirect to login
    router.push("/login");
  }, []);

  const { data: validateToken } = useValidateToken();

  React.useEffect(() => {
    if (!validateToken) return;
    if (validateToken.isAuthenticated) {
      setIsAuthenticated(validateToken.isAuthenticated);
      setUser(validateToken.user);
    } else {
      logout();
    }
  }, [validateToken]);

  React.useEffect(() => {
    if (pathname) {
      // redirect to dashboard if user is accessing login page
      if (isAuthenticated) {
        if (LOGIN_ROUTES.includes(pathname)) {
          router.push("/");
          return;
        }
      }

      // redirect to login if user is not authenticated and the route is protected
      if (!UNPROTECTED_ROUTES.includes(pathname) && !isAuthenticated) {
        router.push("/login");
        return;
      }
    }
  }, [pathname, isAuthenticated]);

  const authObj = React.useMemo(
    () => ({
      logout,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [logout, user, setUser, isAuthenticated, setIsAuthenticated]
  );

  return (
    <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
}
