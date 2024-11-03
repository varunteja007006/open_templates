export type User = {
  email: string;
  full_name: string;
  isAuthenticated: boolean;
};

export type UserLoginPayload = {
  username: string;
  password: string;
};
