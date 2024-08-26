import { create } from "zustand";
import { UserStoreInterface } from "@/interface/user.interface";

const userStore = create<UserStoreInterface>((set) => ({
  token: "",
  expires: 0,
  data: {},
  set: (newState) => {
    set((state) => {
      console.log(newState);
      const updatedState = { ...state, ...newState };
      return updatedState;
    });
  },
  clear: () => {
    set(() => ({
      token: "",
      expires: 0,
      data: {},
    }));
  },
}));

export default userStore;
