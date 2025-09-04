import { toast } from "react-toastify";

const showSuccessSwal = (title: string, callback?: () => void) => {
  toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      if (callback) callback();
    },
    theme: "colored",
  });
};

const showErrorSwal = (title: string, callback?: () => void) => {
  toast.error(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      if (callback) callback();
    },
    theme: "colored",
  });
};

export { showErrorSwal, showSuccessSwal };
