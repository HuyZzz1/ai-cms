// src/components/Toast.js
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Các hàm gọi toast
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast.info(message);
};

// Component hiển thị
export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  );
};
