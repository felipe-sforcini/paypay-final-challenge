import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

export default function ToastError(message) {
  injectStyle();
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { color: "#AE1100", backgroundColor: "#F2D6D0", fontSize: "1.4rem" },
  });
}
