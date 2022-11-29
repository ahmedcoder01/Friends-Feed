import { useCallback } from "react";
import { toast } from "react-toastify";

function useToast() {
  return useCallback((message: string, type: "success" | "error") => {
    toast[type](message);
  }, []);
}

export default useToast;
