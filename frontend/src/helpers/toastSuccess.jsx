import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import successIcon from "../assets/toastSuccessIcon.svg";

export default function ToastSuccess(message) {
  injectStyle();
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
    progress: undefined,
    style: { color: "#243F80", backgroundColor: "#C3D4FE", fontSize: "1.4rem" },
    icon: <img src={successIcon} alt="Success" />,
  });
}
