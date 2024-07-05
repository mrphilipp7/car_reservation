import { create } from "zustand";

export type useUserStoreProps = {
  user: string;
  setUser: (user: string) => void;
};

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: "",
  setUser: (user) => set(() => ({ user: user })),
}));
