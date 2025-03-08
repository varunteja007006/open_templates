import { TUser } from "@/types/user.types";
import { StateCreator } from "zustand";

type TUserState = TUser & {
  isAuthenticated: boolean;
};

type TUserActions = {
  setUserStore: (user: TUser) => void;
  logoutUserStore: () => void;
};

export type userSlice = TUserState & TUserActions;

export const createUserSlice: StateCreator<
  userSlice,
  [["zustand/immer", never]],
  [],
  userSlice
> = (set) => ({
  id: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  isAuthenticated: false,
  logoutUserStore: () => {
    set((state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.isAuthenticated = false;
    });
  },
  setUserStore: (user) => {
    set((state) => {
      state.id = user.id;
      state.username = user.username;
      state.email = user.email;
      state.first_name = user.first_name;
      state.last_name = user.last_name;
      state.isAuthenticated = true;
    });
  },
});
