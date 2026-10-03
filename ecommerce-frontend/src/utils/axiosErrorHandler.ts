import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  } else return "An unexpected error occurred. Please try again later.";
};

export default axiosErrorHandler;
