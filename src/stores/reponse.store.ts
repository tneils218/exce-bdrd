import { create } from "zustand";
import { ResponseInterface } from "@/interface/response.interface.ts";

export const responseStore = create<ResponseInterface>((set) => ({
  code: "",
  message: "",
  data: {},
  set: (newState) => {
    set((state) => {
      return { ...state, ...newState };
    });
  },
  clear: () => {
    set(() => ({
      code: "",
      message: "",
      data: {},
    }));
  },
}));
