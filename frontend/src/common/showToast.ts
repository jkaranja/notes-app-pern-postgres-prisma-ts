import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { toast } from "react-toastify";

interface ShowToast {
  message: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess?: boolean;
  progress?: number;
}

function showToast({
  message,
  isLoading,
  isSuccess,
  isError,
  progress,
}: ShowToast) {
  let toastId = "uuid";
  if (isLoading) {
    toast.info(`Loading...${progress ? progress + "%" : ""}`, {
      toastId,
      progress,
      autoClose: false,
    });

    return;
  }
  if (isSuccess) {
    toast.update(toastId, {
      render: message,
      type: "success",
      autoClose: 5000,
    });
    return;
  }
  if (isError) {
    toast.update(toastId, {
      render: message,
      type: "error",
      autoClose: 5000,
    });
    return;
  }

  toast.dismiss(toastId);
  return;
}

export default showToast;
