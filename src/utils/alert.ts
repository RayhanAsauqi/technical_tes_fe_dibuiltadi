import { toast } from "react-hot-toast";

export function alertError(
  message: string,
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = "top-right"
) {
  toast.error(message || "An error occurred.", {
    position,
  });
}

export function alertSuccess(
  message: string,
  position: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-left" = "top-right"
) {
  toast.success(message || "Success!", {
    position,
  });
}
