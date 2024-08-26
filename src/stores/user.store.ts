import { UserInterface } from "@/interface/user.interface";
import { create } from "zustand";

const userStore = create((set) => ({
  token: "",
  exp: "",
  data: {},

  // Method to set the state and log the token
  set: (newState: UserInterface) =>
    set((state: UserInterface) => {
      const updatedState = { ...state, ...newState };

      // Log the token whenever it's set or updated
      console.log("Token:", updatedState.token);

      return updatedState;
    }),

  // Method to clear the state and log the reset action
  clear: () =>
    set(() => {
      console.log("Token cleared");
      return { token: "", exp: "", data: {} };
    }),
}));

export default userStore;
