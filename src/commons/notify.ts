import { toast } from "react-toastify";

export const notify = (message: string) => toast(message);
export const resposeFailureNotify = (error: any) => {
  if (error.response && error.response.status !== 200) {
    notify(
      error.response.data.message || "Something went wrong. Please try again!"
    );
  } else {
    notify("An unexpected error occurred. Please try again later.");
  }
};
