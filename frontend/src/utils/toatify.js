import { toast } from "react-toastify";

const options = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastify = (msg, type) => {
  if (type === "err") {
    return toast.error(msg, options);
  } else if (type === "success") {
    return toast.success(msg, options);
  }
};
