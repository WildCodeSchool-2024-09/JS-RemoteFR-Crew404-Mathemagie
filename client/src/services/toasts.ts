import { toast } from "react-toastify";

const successToast = (message: string) => {
  toast.success(message);
};

const infoToast = (message: string) => {
  toast.info(message);
};

const errorToast = (message: string) => {
  toast.error(message);
};

export { successToast, infoToast, errorToast };
