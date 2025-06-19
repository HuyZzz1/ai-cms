import { toast } from "sonner";

export const message = {
  success: (msg, options = {}) =>
    toast.success(msg, {
      duration: 3000,
      ...options,
    }),
  error: (msg, options = {}) =>
    toast.error(msg, {
      duration: 4000,
      ...options,
    }),
  warning: (msg, options = {}) =>
    toast.warning(msg, {
      duration: 3500,
      ...options,
    }),
  info: (msg, options = {}) =>
    toast(msg, {
      duration: 3000,
      ...options,
    }),
};
