import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User, type IUser } from "@/models/user.model";
import { httpCall } from "@/services/api.service";
import { sha512 } from "js-sha512";
import type { ILogin } from "@/models/auth.model";

export interface IAuth {
  user: IUser | null;

  clear: () => void;
  loginAsync: (data: ILogin) => Promise<boolean>;
}

const authUser = new User(JSON.parse(localStorage.getItem("authUser") || sessionStorage.getItem("authUser") || '{}') || {});

export const useAuthStore = create<IAuth>()(
  devtools(
    persist(
      (set) => ({
        user: authUser,

        clear: () => set({ user: null }),

        loginAsync: async (data: ILogin): Promise<boolean> => {
          const authUser = await httpCall(
            "auth/login",
            {},
            {
              method: "POST",
              body: JSON.stringify({
                username: data.username,
                password: sha512(data.password),
              }),
              credentials: "include",
            },
          ); 

          if (authUser) {
            if (data.keepme) {
              localStorage.setItem("authUser", JSON.stringify(authUser));
            } else {
              sessionStorage.setItem("authUser", JSON.stringify(authUser));
            }

            set({ user: new User(authUser) });
            return true;
          }
          return false;
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
